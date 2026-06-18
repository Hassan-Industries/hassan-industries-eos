import {
    BarChart3,
    BookOpen,
    BriefcaseBusiness,
    Building2,
    ClipboardCheck,
    ClipboardList,
    FileText,
    FolderArchive,
    Gavel,
    Globe2,
    Headphones,
    Landmark,
    LayoutDashboard,
    Mail,
    Scale,
    Settings,
    ShieldCheck,
  } from "lucide-react";
  
  export const navItems = [
    ["Dashboard", LayoutDashboard],
    ["Governance Library", BookOpen],
    ["Administration", Settings],
    ["Treasury", Landmark],
    ["Legal", Scale],
    ["Tax", Globe2],
    ["Corporate Records", FolderArchive],
    ["Correspondence", Mail],
    ["Technology", ShieldCheck],
    ["Entity Management", Building2],
    ["Publications", FileText],
    ["Resolutions", Gavel],
    ["Service Requests", Headphones],
    ["Implementation Center", ClipboardList],
  ];
  
  export const stats = [
    { label: "Active Entities", value: "12", icon: Building2 },
    { label: "Governance Documents", value: "24", icon: FileText },
    { label: "Active Resolutions", value: "3", icon: Gavel },
    { label: "Open Requests", value: "0", icon: Headphones },
    { label: "Compliance Status", value: "98%", icon: ShieldCheck },
  ];
  
  export const overviewData = [
    { month: "Jan", activity: 8, projects: 2 },
    { month: "Feb", activity: 12, projects: 3 },
    { month: "Mar", activity: 10, projects: 4 },
    { month: "Apr", activity: 15, projects: 5 },
    { month: "May", activity: 18, projects: 6 },
    { month: "Jun", activity: 24, projects: 7 },
  ];
  
  export const notifications = [
    ["Policy Review Due", "HI-TRE-001 annual review schedule pending"],
    ["Execution Copy Pending", "Wet-ink original must be scanned and filed"],
    ["Repository Update", "Phase 3 merged into dev"],
  ];
  
  export const tasks = [
    ["Review Dashboard UI", "Medium"],
    ["Create Publication Register", "High"],
    ["Prepare HI-ADM-001 outline", "Medium"],
  ];
  
  export const quickActions = [
    ["Governance Library", FolderArchive],
    ["Entity Register", Building2],
    ["Board Resolutions", Gavel],
    ["Corporate Records", ClipboardCheck],
    ["Service Center", Headphones],
    ["Reports", BarChart3],
    ["Implementation", BriefcaseBusiness],
    ["Administration", Settings],
  ];