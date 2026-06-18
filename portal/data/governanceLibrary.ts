import {
    BookOpen,
    ClipboardCheck,
    Clock,
    FileArchive,
    FileCheck,
    FileText,
    FolderOpen,
    Gavel,
    Landmark,
    Scale,
    Search,
    Settings,
    ShieldCheck,
  } from "lucide-react";
  
  export const eglStats = [
    ["Active Publications", "241", BookOpen],
    ["Pending Review", "23", Clock],
    ["Pending Execution", "17", ClipboardCheck],
    ["Certified Copies", "89", FileCheck],
    ["Active Policies", "64", FileText],
  ];
  
  export const publicationSeries = [
    ["Governance", "27 Publications", ShieldCheck],
    ["Administration", "41 Publications", Settings],
    ["Treasury", "33 Publications", Landmark],
    ["Legal", "29 Publications", Scale],
    ["Tax", "21 Publications", FileArchive],
    ["Records", "18 Publications", FolderOpen],
    ["Correspondence", "17 Publications", FileText],
    ["Technology", "15 Publications", Settings],
    ["Resolutions", "12 Publications", Gavel],
  ];
  
  export const publications = [
    ["HI-ADM-001", "Enterprise Administration & Enterprise Services Manual", "Administration", "AP", "1.0", "HCA"],
    ["HI-ADM-002", "Enterprise Document Control Standard", "Administration", "AP", "1.0", "HCA"],
    ["HI-TRE-001", "Enterprise Treasury Manual", "Treasury", "AP", "1.0", "HCA"],
    ["HI-GOV-001", "Enterprise Governance Manual", "Governance", "DR", "0.1", "HCA"],
    ["HCP-RES-2026-001", "Foundational Treasury Resolution", "Resolutions", "OE", "1.0", "HCP"],
  ];
  
  export const statusCodes = [
    ["DR", "Draft"],
    ["RV", "Review"],
    ["AP", "Approved"],
    ["OE", "Original Executed"],
    ["CC", "Certified Copy"],
    ["SP", "Superseded"],
    ["AR", "Archived"],
    ["VO", "Void"],
  ];
  
  export const detailPreview = [
    ["Publication Series", "Administration"],
    ["Document Type", "Manual"],
    ["Owner", "Hassan Corporate Agents"],
    ["Authority", "Hassan Capital Partners, LLC"],
    ["Version", "1.0"],
    ["Status", "AP — Approved"],
    ["Document State", "Active"],
    ["Review Date", "2027-06-18"],
    ["Original Executed Location", "HCA Vault / Originals"],
    ["Certified Copy", "Available"],
  ];
  
  export const quickActions = [
    "Create New Publication",
    "New Resolution",
    "Upload Document",
    "Create Certified Copy",
    "Create Implementation Packet",
    "View Registers",
  ];
  
  export const lifecycleFlow =
    "Draft → Review → Approved → Original Executed → Certified Copy → Active → Superseded / Archived / Void";
  
  export { BookOpen, Search };