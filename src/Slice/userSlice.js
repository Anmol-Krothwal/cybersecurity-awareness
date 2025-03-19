import { createSlice } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
    name: "user",
    initialState: { userDetails: storedUser },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(AuthSlice.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            // state.user = payload  --> explicitly creates a property called user inside your slice's state. Since your slice is already registered under the key "user" in the store, you end up with a nested structure: state.user.user.
            //return payload; --> This sets the state to the payload directly
            state.userDetails = payload;
            localStorage.setItem("user", JSON.stringify(payload));
        });
        builder.addMatcher(AuthSlice.endpoints.logoutUser.matchFulfilled, (state, { payload }) => {
            state.userDetails = null;
            localStorage.removeItem("user");
        });
        builder.addMatcher(AuthSlice.endpoints.editUser.matchFulfilled, (state, { meta, payload }) => {
            console.log(meta)
            const {field, val} = meta.arg.originalArgs
            console.log(field, val)
            if (state.userDetails) {
                state.userDetails = { ...state.userDetails, [field]:val }; // Merge updated fields
                localStorage.setItem("user", JSON.stringify(state.userDetails)); // Save updates to localStorage
            }
        });

    }
})

export default userSlice.reducer;


//How this works?
// 1️⃣builder.addMatcher(...) is used to listen for a specific condition
// AuthSlice.endpoints.editUser.matchFulfilled fires when the editUser API call succeeds
// 2️⃣ (state, { meta, payload }) => { ... }
// This is the callback function that executes when the editUser mutation is successful.
// state → Current state of userSlice (i.e., state.userDetails contains the logged-in user data).
// meta → Contains metadata about the request, including the arguments that were passed to editUser.
// payload → The server's response, but we don't use it here because the API response may not return the full user object.
// 3️⃣ const { field, val } = meta.arg;
// meta.arg contains the exact parameters we sent when calling editUser.
// We extract field (which user property was edited) and val (the new value).
// 🔹 Example
// If we called:
// editUser({ userId: "123", field: "name", val: "John Doe" }); Then: meta.arg = { userId: "123", field: "name", val: "John Doe" };
// Extracted values:
// field = "name";
// val = "John Doe";
// 4️⃣state.userDetails[field] = val;
// Updates the specific field in userDetails.
// Since userDetails is stored in Redux, this ensures the UI reflects the latest changes immediately.
// 5️⃣localStorage.setItem("user", JSON.stringify(state.userDetails));
// Syncs the updated user data to localStorage, ensuring persistence across page reloads.