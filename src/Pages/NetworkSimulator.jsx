import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./NetworkSimulator.css";
import NavbarEnthusiast from "../Components/NavbarEnthusiast";
import FooterEnthusiast from "../Components/FooterEnthusiast";

const dummyData = {
  "192.168.1.10": [
  // Critical
  {
    severity: "Critical",
    cve: "CVE-2025-53770",
    description: "A deserialization flaw in on-prem SharePoint allows attackers to send crafted objects that bypass authentication and achieve remote code execution, often used in ransomware attacks.",
    port: 443,
    details: "Invalid deserialization flows allow attackers to inject malicious classes in SharePoint deserialization handlers.",
    moreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2025-53770"
  },
  {
    severity: "Critical",
    cve: "CVE-2025-54253",
    description: "An exploit chain in Adobe Experience Manager Forms allows unauthenticated attackers to execute arbitrary code through chained flaws.",
    port: 4502,
    details: "The combination of SSRF and template injection enables full system compromise.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-54253"
  },
  {
    severity: "Critical",
    cve: "CVE-2025-54948",
    description: "A remote code execution vulnerability in Trend Micro Apex One allows attackers to send special packets that trigger remote code execution on vulnerable hosts.",
    port: 8443,
    details: "The flaw resides in the management console’s request parsing logic, allowing arbitrary code execution.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-54948"
  },

  // High
  {
    severity: "High",
    cve: "CVE-2025-21479",
    description: "Memory corruption in the Qualcomm Adreno GPU driver on Android devices may be triggered by crafted graphics commands, allowing attackers to execute arbitrary code without user interaction.",
    port: 8000,
    details: "Improper memory handling in shader compilation leads to out-of-bounds execution.",
    moreInfo: "https://techradar.com/pro/security/google-patches-major-qualcomm-security-flaw-hitting-android-phones-heres-what-we-know"
  },
  {
    severity: "High",
    cve: "CVE-2025-49704",
    description: "A high-severity flaw in SharePoint enables session fixation and privilege escalation, allowing authenticated low-privilege users to gain administrative access.",
    port: 443,
    details: "Session tokens can be reused by attackers to escalate privileges in SharePoint environments.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-49704"
  },

  // Medium
  {
    severity: "Medium",
    cve: "CVE-2025-5064",
    description: "Chrome’s Background Fetch API has incomplete input validation, allowing attackers to trigger data leaks or unexpected downloads in users’ browsers.",
    port: 8080,
    details: "The flaw allows remote attackers to craft background fetch requests that bypass sanitization routines.",
    moreInfo: "https://news.laptopmag.com/google-release-critical-chrome-update"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-49706",
    description: "A misconfiguration in SharePoint’s authentication logic allows privilege escalation via forged authentication headers.",
    port: 443,
    details: "Attackers can craft headers that bypass security restrictions and impersonate admin users.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-49706"
  },

  // Low
  {
    severity: "Low",
    cve: "CVE-2025-8753",
    description: "A path traversal flaw in the Litemall application allows attackers to access local files when providing crafted storage keys.",
    port: 8081,
    details: "An unvalidated storage key parameter lets attackers retrieve arbitrary files including credentials.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-8753"
  },

  // Info
  {
    severity: "Info",
    cve: "CVE-2025-7726",
    description: "A minor XSS vulnerability in the Macrozheng Mall site allows non-privileged scripts to run in product description pages, but only affects UI rendering without user-data access.",
    port: 8082,
    details: "Embedded scripts in product fields get executed but are restricted in scope.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-7726"
  }
],
  "192.168.1.11": [
  // Critical (2)
  {
    severity: "Critical",
    cve: "CVE-2025-23319",
    description:
      "An out-of-bounds write vulnerability in the Python backend of NVIDIA’s Triton Inference Server allows unauthenticated remote attackers to execute arbitrary code, crash the system, or tamper with data.",
    port: 8001,
    details:
      "Sending specially crafted requests triggers memory corruption in the Triton Python service, enabling RCE, data tampering, or denial of service.",
    moreInfo:
      "https://nvd.nist.gov/vuln/detail/CVE-2025-23319"
  },
  {
    severity: "Critical",
    cve: "CVE-2025-23310",
    description:
      "A stack-based buffer overflow in Triton’s request handler could let attackers execute remote code or crash the server using crafted HTTP payloads.",
    port: 8001,
    details:
      "Malformed HTTP requests with excessive chunked encoding cause stack corruption leading to RCE, DOS, or data exposure.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },

  // High (3)
  {
    severity: "High",
    cve: "CVE-2025-23320",
    description:
      "Python backend shared memory limit vulnerability in Triton can lead to sensitive information disclosure when overloaded by attackers.",
    port: 8001,
    details:
      "A large request bypasses memory checks and leaks sensitive data via shared memory buffers.",
    moreInfo:
      "https://nvd.nist.gov/vuln/detail/CVE-2025-23320"
  },
  {
    severity: "High",
    cve: "CVE-2025-23317",
    description:
      "An HTTP server flaw in Triton enables a reverse shell via crafted request, letting unauthenticated attackers remotely execute commands.",
    port: 8001,
    details:
      "By exploiting parsing logic flaws, attackers can initiate a reverse shell without authentication.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "High",
    cve: "CVE-2025-23318",
    description:
      "Triton’s Python backend suffers from an out-of-bounds write that can result in remote code execution or data manipulation.",
    port: 8001,
    details:
      "Malformed Python backend requests corrupt memory, leading to potential RCE, tampering, or denial of service.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },

  // Medium (3)
  {
    severity: "Medium",
    cve: "CVE-2025-23333",
    description:
      "An out-of-bounds read in Triton’s Python backend can cause information disclosure when processing shared memory data.",
    port: 8001,
    details:
      "Manipulated shared memory access can leak internal data structures, though not full RCE.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-23334",
    description:
      "Another out-of-bounds read bug in Triton’s Python backend that can be manipulated to expose sensitive memory buffer data.",
    port: 8001,
    details:
      "Crafted request paths trigger read beyond bounds, resulting in data leakage.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-23335",
    description:
      "A numeric underflow in Triton’s TensorRT backend may cause denial of service by crashing model inference when handling malformed inputs.",
    port: 8001,
    details:
      "Specific model configurations combined with malformed requests trigger backend failures.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },

  // Low (2)
  {
    severity: "Low",
    cve: "CVE-2025-23325",
    description:
      "Uncontrolled recursion vulnerability in Triton’s inference engine can lead to denial of service using nested or malformed inputs.",
    port: 8001,
    details:
      "Attackers can craft inputs that overload recursive inference loops, crashing the application.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Low",
    cve: "CVE-2025-23322",
    description:
      "Double free vulnerability in Triton’s streaming handler can cause a denial of service when a stream is canceled mid-processing.",
    port: 8001,
    details:
      "Canceling active streams may result in memory corruption and service instability.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },

  // Info (2)
  {
    severity: "Info",
    cve: "CVE-2025-23321",
    description:
      "A divide-by-zero error in Triton’s request parser may crash the server when handling invalid input patterns.",
    port: 8001,
    details:
      "Malformed requests that cause a divide-by-zero result in server crash, with limited attack scope.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Info",
    cve: "CVE-2025-23331",
    description:
      "Oversized memory allocation request in Triton can lead to segmentation faults due to resource exhaustion.",
    port: 8001,
    details:
      "Requests with excessive memory demands crash the inference server without privilege escalation.",
    moreInfo:
      "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  }
],
"192.168.1.12": [
  // Critical (3)
  {
    severity: "Critical",
    cve: "CVE-2025-53771",
    description:
      "Improper authentication in on-prem SharePoint allows unauthenticated attackers to perform network spoofing, enabling them to bypass access controls and push malicious payloads.",
    port: 443,
    details:
      "Attackers can craft Referer headers that mimic legitimate workflows, tricking SharePoint into granting unauthorized access.",
    moreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2025-53771"
  },
  {
    severity: "Critical",
    cve: "CVE-2025-53770",
    description:
      "A deserialization flaw in SharePoint Server enables remote code execution without authentication, forming the RCE stage of the ‘ToolShell’ attack chain.",
    port: 443,
    details:
      "Exploitation involves uploading malicious 'VIEWSTATE' payloads to gain network-level code execution.",
    moreInfo: "https://www.trendmicro.com/en_us/research/25/g/cve-2025-53770-and-cve-2025-53771-sharepoint-attacks.html"
  },
  {
    severity: "Critical",
    cve: "CVE-2025-49704",
    description:
      "Original remote code execution flaw in SharePoint Server, allowing unauthenticated attackers to execute arbitrary code via crafted requests.",
    port: 443,
    details:
      "Used as part of the ToolShell exploit chain, this deserialization bug enables full system compromise.",
    moreInfo: "https://www.cisa.gov/news-events/alerts/2025/07/20/update-microsoft-releases-guidance-exploitation-sharepoint-vulnerabilities"
  },

  // High (3)
  {
    severity: "High",
    cve: "CVE-2025-23319",
    description:
      "Remote code execution in Nvidia Triton Inference Server Python backend, allowing unauthenticated attackers to run arbitrary code via crafted inference requests.",
    port: 8001,
    details:
      "Exploitation sends malformed data to Triton’s Python service to trigger uncontrolled code execution.",
    moreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2025-23319"
  },
  {
    severity: "High",
    cve: "CVE-2025-5063",
    description:
      "Use-after-free in Chrome’s compositing engine allows attackers to execute arbitrary code via crafted HTML and CSS combinations.",
    port: 8080,
    details:
      "Crafted graphics triggers deallocation and reuse of freed memory, providing code execution paths.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-5063"
  },
  {
    severity: "High",
    cve: "CVE-2025-5065",
    description:
      "UI spoofing in Chrome’s FileSystemAccess API via a crafted HTML page, which can trick users into granting unintended permissions.",
    port: 8081,
    details:
      "Lacks proper validation, allowing attackers to present misleading UI elements for dangerous user actions.",
    moreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2025-5065"
  },

  // Medium (4)
  {
    severity: "Medium",
    cve: "CVE-2025-5064",
    description:
      "Background Fetch API in Chrome leaks cross-origin data by mismanaging fetch state transitions.",
    port: 8082,
    details:
      "Crafted fetch requests may leak sensitive information across web origins.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-5064"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-5066",
    description:
      "UI spoofing in Chrome’s Messages feature on Android via crafted notifications, potentially misleading users into sharing sensitive info.",
    port: 8083,
    details:
      "UI elements can be manipulated to intercept taps and steal user credentials.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-5066"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-5283",
    description:
      "Use-after-free in libvpx within Chrome/V8 engine may lead to crashes or limited information leakage when decoding malicious video content.",
    port: 8084,
    details:
      "Malformed media streams trigger memory mismanagement during raw video decoding.",
    moreInfo: "https://www.laptopmag.com/software/browsers-search-engines/google-chrome-june-5-2025-update"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-49706",
    description:
      "A spoofing vulnerability in SharePoint Server that weakens authentication checks, enabling bypass when chained with RCE bugs.",
    port: 443,
    details:
      "Ivoking spoofed authentication headers lets attackers elevate privileges or deploy malicious code.",
    moreInfo: "https://www.cisa.gov/news-events/alerts/2025/07/20/update-microsoft-releases-guidance-exploitation-sharepoint-vulnerabilities"
  },

  // Low (3)
  {
    severity: "Low",
    cve: "CVE-2025-5067",
    description:
      "UI spoofing vulnerability in Chrome’s Tab Strip interface on desktop platforms, potentially confusing users into visiting harmful sites.",
    port: 8085,
    details:
      "Crafted tab layouts may mask destination URL, prompting unsafe navigation.",
    moreInfo: "https://chromereleases.googleblog.com/2025/05/early-stable-update-for-desktop.html"
  },
  {
    severity: "Low",
    cve: "CVE-2025-23322",
    description:
      "Double-free in Triton Server’s streaming handler can lead to denial of service when streams are abruptly cancelled.",
    port: 8001,
    details:
      "Aborting streaming sessions causes memory corruption but cannot escalate privileges.",
    moreInfo: "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Low",
    cve: "CVE-2025-23325",
    description:
      "Uncontrolled recursion in Triton’s inference engine allows denial of service by overwhelming recursive input handling.",
    port: 8001,
    details:
      "Malicious inference loops can crash the server, though no data leakage occurs.",
    moreInfo: "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },

  // Info (3)
  {
    severity: "Info",
    cve: "CVE-2025-23321",
    description:
      "Divide-by-zero error in Triton’s request parser may crash the service when handling invalid formatted requests.",
    port: 8001,
    details:
      "Segmentation fault results without deeper memory access or privilege escalation.",
    moreInfo: "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Info",
    cve: "CVE-2025-23331",
    description:
      "Excessive memory allocation in Triton can cause segmentation faults from resource exhaustion, impacting availability.",
    port: 8001,
    details:
      "Attacks trigger crashes but do not lead to code execution or leak internal data.",
    moreInfo: "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Info",
    cve: "CVE-2025-5068",
    description:
      "Minor XSS in Chrome’s address bar highlighting may leak context in specialized cases, but has low exploitability.",
    port: 8086,
    details:
      "Visual artifacts can reveal partial URL path in tooltips.",
    moreInfo: "https://chromereleases.googleblog.com/2025/05/early-stable-update-for-desktop.html"
  }
],
 "192.168.2.18": [
  // Critical (1)
  {
    severity: "Critical",
    cve: "CVE-2025-32756",
    description:
      "A critical stack-based buffer overflow in multiple Fortinet products (including FortiMail, FortiVoice, and FortiRecorder) allows unauthenticated remote attackers to execute arbitrary code without user interaction.",
    port: 443,
    details:
      "Exploited via specially crafted HTTP requests with malicious cookies, this vulnerability has a CVSS score of 9.8 and is being actively exploited in the wild.",
    moreInfo: "https://strobes.co/blog/top-cves-of-may-2025/"
  },

  // High (4)
  {
    severity: "High",
    cve: "CVE-2025-54948",
    description:
      "A command injection zero-day in Trend Micro Apex One console enables pre-authenticated attackers to upload and execute malicious code, potentially deploying malware or ransomware.",
    port: 8443,
    details:
      "The flaw targets the on-prem management console and has been observed in active exploitation campaigns; mitigations are urgently recommended.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-54948"
  },
  {
    severity: "High",
    cve: "CVE-2025-48530",
    description:
      "A ‘no-touch’ Android RCE vulnerability allows remote device compromise without any user interaction, leveraging flawed graphics or media components.",
    port: 5555,
    details:
      "Exploitable via remote attack vectors, it bypasses all prompts or permissions and poses a severe risk to user devices.",
    moreInfo: "https://www.thescottishsun.co.uk/tech/15175514/google-android-remote-hacker-scammers/"
  },
  {
    severity: "High",
    cve: "CVE-2025-21479",
    description:
      "An Adreno GPU driver memory corruption flaw in Android devices allows attackers to execute arbitrary commands through malformed GPU command sequences.",
    port: 8000,
    details:
      "Actively targeted by state-sponsored actors; this high severity bug empowers full system compromise on affected devices.",
    moreInfo: "https://techradar.com/pro/security/google-patches-major-qualcomm-security-flaw-hitting-android-phones-heres-what-we-know"
  },
  {
    severity: "High",
    cve: "CVE-2025-27038",
    description:
      "A memory corruption vulnerability in Chrome’s rendering of Adreno GPU content, enabling attackers to crash or hijack browser sessions via crafted content.",
    port: 8000,
    details:
      "Linked to in-the-wild exploitation campaigns; the bug is fixed in recent Android security patches.",
    moreInfo: "https://techradar.com/pro/security/google-patches-major-qualcomm-security-flaw-hitting-android-phones-heres-what-we-know"
  },

  // Medium (3)
  {
    severity: "Medium",
    cve: "CVE-2025-5064",
    description:
      "Chrome’s Background Fetch API fails to properly isolate cross-origin requests, potentially leaking sensitive data across domains.",
    port: 8080,
    details:
      "Exploit scenarios involve crafted payloads that can bypass browser fetch validation, resulting in unauthorized data exposure.",
    moreInfo: "https://laptopmag.com/software/browsers-search-engines/google-chrome-june-5-2025-update"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-5065",
    description:
      "A UI spoofing flaw in Chrome’s FilesystemAccess API can manipulate permission dialogs, tricking users into granting dangerous access.",
    port: 8081,
    details:
      "Attackers can craft misleading dialog displays that hide the true nature of the permissions requested.",
    moreInfo: "https://laptopmag.com/software/browsers-search-engines/google-chrome-june-5-2025-update"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-5066",
    description:
      "Chrome’s Messages feature on Android permits dialog spoofing via crafted notifications, potentially leading to phishing or credential leaks.",
    port: 8082,
    details:
      "Exploits rely on deceptive UI invocation, not requiring system privilege and often unnoticed by users.",
    moreInfo: "https://laptopmag.com/software/browsers-search-engines/google-chrome-june-5-2025-update"
  },

  // Low (2)
  {
    severity: "Low",
    cve: "CVE-2025-8742",
    description:
      "Login brute-force detection bypass in Macrozheng Mall admin portal allows multiple failed attempts without proper locking.",
    port: 8083,
    details:
      "High complexity to exploit; still, the absence of throttling is an undesirable security lapse.",
    moreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2025-8742"
  },
  {
    severity: "Low",
    cve: "CVE-2025-8740",
    description:
      "Stored XSS vulnerability in zhenfeng13 My-Blog admin category handler, which can be triggered with malicious category names.",
    port: 8084,
    details:
      "Unsanitized input in admin UI allows persistent script injection, though limited by admin-only access scope.",
    moreInfo: "https://nvd.nist.gov/vuln/search/results?query=2025-8740"
  },

  // Info (2)
  {
    severity: "Info",
    cve: "CVE-2025-55003",
    description:
      "MFA rate-limiting bypass in OpenBao client due to whitespace normalization allows reuse of valid codes, lowering authentication security.",
    port: 8085,
    details:
      "Not truly exploitable remotely; serves as a caution on string handling and normalization logic.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-55003"
  },
  {
    severity: "Info",
    cve: "CVE-2025-55008",
    description:
      "In AuthKit for React Router, session tokens (sealedSession, accessToken) are inadvertently exposed in client-side HTML, risking token leakage.",
    port: 8086,
    details:
      "Tokens embedded due to misconfiguration, but only visible when accessing dev tools; still a privacy concern.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-55008"
  }
],
"192.168.5.21": [
  {
    severity: "Critical",
    cve: "CVE-2025-53770",
    description: "A zero-day deserialization vulnerability in on-prem SharePoint ('ToolShell') enables unauthenticated remote code execution, widely exploited in targeted ransomware and espionage campaigns.",
    port: 443,
    details: "Crafted VIEWSTATE payloads bypass authentication and lead to server takeover. Active in the wild across government and enterprise environments.",
    moreInfo: "https://windowscentral.com/software-apps/were-witnessing-an-urgent-and-active-threat-microsoft-sharepoint-toolshell-vulnerability-is-being-attacked-globally"
  },
  {
    severity: "High",
    cve: "CVE-2025-54948",
    description: "A command injection zero-day in Trend Micro Apex One allows pre-authenticated attackers to execute arbitrary code via the management console, risking full endpoint compromise.",
    port: 8443,
    details: "The flaw allows remote attackers to upload and run malicious payloads through crafted requests, with active exploitation in corporate environments.",
    moreInfo: "https://techradar.com/pro/security/trend-micro-tells-users-to-patch-immediately-to-protect-from-apex-one-zero-day"
  },
  {
    severity: "High",
    cve: "CVE-2025-21479",
    description: "A memory corruption bug in Qualcomm’s Adreno GPU driver affects many Android devices, enabling attackers to run arbitrary code through crafted GPU graphics workloads.",
    port: 8000,
    details: "Users can be compromised remotely without interaction, through manipulated graphical content, and patches are rolling out OEM-wide.",
    moreInfo: "https://tomsguide.com/computing/online-security/googles-august-security-patches-include-a-fix-for-these-two-qualcomm-flaws-update-right-now"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-32462",
    description: "A high-severity policy-check bypass in sudo lets local users gain root privileges by tricking host-based checks.",
    port: 22,
    details: "Using unintended host flags allows minimal privilege users to execute commands as root; patch in sudo 1.9.17p1.",
    moreInfo: "https://oligo.security/blog/new-sudo-vulnerabilities-cve-2025-32462-and-cve-2025-32463"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-5064",
    description: "Chrome’s Background Fetch API has cross-origin isolation flaws that may leak sensitive fetch data to untrusted websites.",
    port: 8080,
    details: "Crafted web pages can exploit state transitions during background fetches, exposing data between origins.",
    moreInfo: "https://laptopmag.com/software/browsers-search-engines/google-chrome-june-5-2025-update"
  },
  {
    severity: "Medium",
    cve: "CVE-2025-5065",
    description: "Chrome’s FileSystemAccess API is vulnerable to UI spoofing, potentially pushing users to grant dangerous permissions unwittingly.",
    port: 8081,
    details: "Attackers create misleading UI, prompting users to give access to sensitive file paths.",
    moreInfo: "https://laptopmag.com/software/browsers-search-engines/google-chrome-june-5-2025-update"
  },
  {
    severity: "Low",
    cve: "CVE-2025-23321",
    description: "A divide-by-zero error in Triton’s request parser causes crashes when receiving malformed inputs, avoiding deeper memory corruption.",
    port: 8001,
    details: "Improper error handling leads to denial-of-service in lab environments, without escalated privileges or data leaks.",
    moreInfo: "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Low",
    cve: "CVE-2025-55008",
    description: "AuthKit for React Router inadvertently exposes session tokens in client-side HTML, which could be accessed via browser dev-tools.",
    port: 3000,
    details: "While tokens aren’t visible to end-users directly, dev tools can reveal access tokens—posing minor privacy risks.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-55008"
  },
  {
    severity: "Info",
    cve: "CVE-2025-23331",
    description: "Excessive memory allocation in Triton inference server via malformed payloads may cause segmentation faults without exposing data.",
    port: 8001,
    details: "Resource exhaustion leads to instability, but remote code execution is not possible in this exploit scenario.",
    moreInfo: "https://nvidia.custhelp.com/app/answers/detail/a_id/5687"
  },
  {
    severity: "Info",
    cve: "CVE-2025-55003",
    description: "MFA rate-limit bypass via whitespace normalization issues allows reuse of previously valid codes in OpenBao client apps.",
    port: 8085,
    details: "Normalization quirks reduce security of MFA flows. No remote exploit yet, but worth hardening practices.",
    moreInfo: "https://www.tenable.com/cve/CVE-2025-55003"
  }
],

};

const severityColors = {
  Critical: "#e74c3c",
  High: "#e67e22",
  Medium: "#f1c40f",
  Low: "#2ecc71",
  Info: "#3498db",
};

const recommendedActions = {
  Critical: "Patch immediately. Restrict access until fixed.",
  High: "Update software and monitor logs closely.",
  Medium: "Apply security patches soon.",
  Low: "Plan an update in the next cycle.",
  Info: "No immediate action required.",
};

export default function NetworkSimulator() {
  const [selectedIP, setSelectedIP] = useState("30.30.0.100");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCVE, setSelectedCVE] = useState(null);
  const [filter, setFilter] = useState("All");
  const [scanLog, setScanLog] = useState([]);
  const [currentPort, setCurrentPort] = useState(0);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Start scanning
  const startScan = () => {
    setResults([]);
    setSelectedCVE(null);
    setProgress(0);
    setLoading(true);
    setScanLog([]);
    setCurrentPort(0);

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setResults(dummyData[selectedIP]);
            setLoading(false);
          }, 500);
          return 100;
        }
        // fake port scanning
        setCurrentPort(Math.floor(Math.random() * 65535));
        setScanLog((prevLog) => [
          ...prevLog,
          `Scanning port ${Math.floor(Math.random() * 65535)}...`,
        ]);
        return prev + 5;
      });
    }, 200);
  };

  // Pie Chart Update
  useEffect(() => {
    if (results.length === 0) return;
    const count = { Critical: 0, High: 0, Medium: 0, Low: 0, Info: 0 };
    results.forEach((r) => {
      count[r.severity] = (count[r.severity] || 0) + 1;
    });

    const ctx = document.getElementById("chart");
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(count),
        datasets: [
          {
            label: "Vulnerabilities",
            data: Object.values(count),
            backgroundColor: Object.keys(count).map((sev) => severityColors[sev]),
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }, [results]);

  // Packet animation
  useEffect(() => {
    if (!loading) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff99";
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [loading]);

  // Filtered results
  const displayedResults =
    filter === "All" ? results : results.filter((r) => r.severity === filter);

  return (
    <>
      <NavbarEnthusiast />
      <div
        style={{
          fontFamily: "Segoe UI",
          padding: "2rem",
          background: "#0d1117",
          minHeight: "100vh",
          color: "#e6edf3",
        }}
      >
        <h3 
        style={{ 
          marginBottom: "2rem", 
          fontSize: "2.5rem", 
          fontWeight: "bold" 
        }}
      >
        🛡️ Network Vulnerability Scanner
      </h3>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <select
            value={selectedIP}
            onChange={(e) => setSelectedIP(e.target.value)}
            style={{ padding: "0.5rem", background: "#161b22", color: "#e6edf3" }}
          >
            {Object.keys(dummyData).map((ip) => (
              <option key={ip} value={ip}>
                {ip}
              </option>
            ))}
          </select>
          <button
            onClick={startScan}
            style={{
              padding: "0.5rem 1.2rem",
              backgroundColor: "#238636",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Start Scan
          </button>
        </div>

        {/* Filter buttons */}
        <div style={{ margin: "1rem 0" }}>
          {["All", "Critical", "High", "Medium", "Low", "Info"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              style={{
                marginRight: "0.5rem",
                padding: "0.3rem 0.8rem",
                background:
                  filter === sev ? severityColors[sev] || "#444" : "#21262d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Packet animation during scan */}
        {loading && (
          <>
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              style={{
                background: "#161b22",
                display: "block",
                marginBottom: "1rem",
                border: "1px solid #30363d",
              }}
            />
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Currently scanning port:</strong> {currentPort}
            </div>
          </>
        )}

        {/* Progress bar */}
        {loading && (
          <div style={{ margin: "1rem 0", width: "300px" }}>
            <div
              style={{
                height: "20px",
                backgroundColor: "#30363d",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  backgroundColor: "#27ae60",
                  height: "100%",
                  transition: "width 0.4s",
                }}
              />
            </div>
            <p>Scanning... {progress}%</p>
          </div>
        )}

        {/* Realistic scan log */}
        {loading && (
          <div
            style={{
              background: "#161b22",
              padding: "0.5rem",
              borderRadius: "6px",
              maxHeight: "150px",
              overflowY: "auto",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              border: "1px solid #30363d",
            }}
          >
            {scanLog.map((line, idx) => (
              <div key={idx} style={{ color: "#00ff99" }}>
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !loading && (
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            <div style={{ flex: 2 }}>
              <h3>Scan Results for {selectedIP}</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "1rem",
                  background: "#161b22",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "8px" }}>Severity</th>
                    <th style={{ padding: "8px" }}>CVE</th>
                    <th style={{ padding: "8px" }}>Description</th>
                    <th style={{ padding: "8px" }}>Port</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {displayedResults.map((r, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedCVE(r)}
                      style={{
                        background:
                          selectedCVE?.cve === r.cve
                            ? "#0d419d"
                            : i % 2 === 0
                            ? "#0d1117"
                            : "#161b22",
                        cursor: "pointer",
                      }}
                    >
                      <td
                        title={recommendedActions[r.severity]}
                        style={{ color: severityColors[r.severity], padding: "8px" }}
                      >
                        {r.severity}
                      </td>
                      <td style={{ padding: "8px" }}>{r.cve}</td>
                      <td style={{ padding: "8px" }}>{r.description}</td>
                      <td style={{ padding: "8px" }}>{r.port}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right panel */}
            <div style={{ flex: 1 }}>
              <div style={{ height: "250px", width: "250px", marginBottom: "1rem" }}>
                <canvas id="chart"></canvas>
              </div>

              {selectedCVE && (
                <div
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    padding: "1rem",
                    borderRadius: "6px",
                  }}
                >
                  <h4>🔍 CVE Detail</h4>
                  <p><strong>Severity:</strong> {selectedCVE.severity}</p>
                  <p><strong>CVE ID:</strong> {selectedCVE.cve}</p>
                  <p><strong>Description:</strong> {selectedCVE.description}</p>
                  <p><strong>Details:</strong> {selectedCVE.details}</p>
                  <p><strong>Port:</strong> {selectedCVE.port}</p>
                  <p><strong>moreInfo:</strong> {selectedCVE.moreInfo}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <FooterEnthusiast />
    </>
  );
}
