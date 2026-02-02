/**
 * ISO 9001:2015 Self-Assessment Seed Data
 * 
 * This file contains all StandardSections and AuditQuestions
 * for the ISO 9001:2015 Quality Management System.
 * 
 * Usage: Import into your Prisma seed file (prisma/seed.ts)
 * 
 * Data Models (from PRD):
 * - StandardSection: { id, sectionNumber, title, description }
 * - AuditQuestion: { id, sectionId, standardReference, standardText, auditQuestion, score1Criteria, score2Criteria, score3Criteria }
 */

// ============================================
// STANDARD SECTIONS (ISO 9001:2015 Clauses)
// ============================================

export const standardSections = [
  {
    sectionNumber: "4",
    title: "Context of the Organization",
    description: "Requirements for understanding the organization's context, interested parties, scope, and QMS processes."
  },
  {
    sectionNumber: "4.1",
    title: "Understanding the organization and its context",
    description: "Determine external and internal issues relevant to purpose and strategic direction affecting QMS outcomes."
  },
  {
    sectionNumber: "4.2",
    title: "Understanding the needs and expectations of interested parties",
    description: "Determine interested parties relevant to the QMS and their requirements."
  },
  {
    sectionNumber: "4.3",
    title: "Determining the scope of the quality management system",
    description: "Determine boundaries and applicability of the QMS to establish its scope."
  },
  {
    sectionNumber: "4.4",
    title: "Quality management system and its processes",
    description: "Establish, implement, maintain and continually improve the QMS including needed processes."
  },
  {
    sectionNumber: "5",
    title: "Leadership",
    description: "Requirements for top management leadership, commitment, policy, and organizational roles."
  },
  {
    sectionNumber: "5.1",
    title: "Leadership and commitment",
    description: "Top management demonstration of leadership and commitment to the QMS."
  },
  {
    sectionNumber: "5.2",
    title: "Policy",
    description: "Establishing, implementing, and maintaining the quality policy."
  },
  {
    sectionNumber: "5.3",
    title: "Organizational roles, responsibilities and authorities",
    description: "Assignment and communication of responsibilities and authorities for relevant roles."
  },
  {
    sectionNumber: "6",
    title: "Planning",
    description: "Requirements for planning including risks/opportunities, objectives, and changes."
  },
  {
    sectionNumber: "6.1",
    title: "Actions to address risks and opportunities",
    description: "Determine and plan actions to address risks and opportunities."
  },
  {
    sectionNumber: "6.2",
    title: "Quality objectives and planning to achieve them",
    description: "Establish quality objectives at relevant functions, levels, and processes."
  },
  {
    sectionNumber: "6.3",
    title: "Planning of changes",
    description: "Carry out changes to the QMS in a planned manner."
  },
  {
    sectionNumber: "7",
    title: "Support",
    description: "Requirements for resources, competence, awareness, communication, and documented information."
  },
  {
    sectionNumber: "7.1",
    title: "Resources",
    description: "Determine and provide resources needed for QMS establishment, implementation, maintenance and improvement."
  },
  {
    sectionNumber: "7.2",
    title: "Competence",
    description: "Determine necessary competence and ensure persons are competent."
  },
  {
    sectionNumber: "7.3",
    title: "Awareness",
    description: "Ensure persons are aware of quality policy, objectives, their contribution, and implications of non-conformity."
  },
  {
    sectionNumber: "7.4",
    title: "Communication",
    description: "Determine internal and external communications relevant to the QMS."
  },
  {
    sectionNumber: "7.5",
    title: "Documented information",
    description: "QMS documented information requirements including creation, update, and control."
  },
  {
    sectionNumber: "8",
    title: "Operation",
    description: "Requirements for operational planning, product/service requirements, design, external providers, production, release, and nonconforming outputs."
  },
  {
    sectionNumber: "8.1",
    title: "Operational planning and control",
    description: "Plan, implement and control processes needed for product and service provision."
  },
  {
    sectionNumber: "8.2",
    title: "Requirements for products and services",
    description: "Customer communication and determination of product/service requirements."
  },
  {
    sectionNumber: "8.3",
    title: "Design and development of products and services",
    description: "Establish, implement and maintain design and development process."
  },
  {
    sectionNumber: "8.4",
    title: "Control of externally provided processes, products and services",
    description: "Ensure externally provided processes, products and services conform to requirements."
  },
  {
    sectionNumber: "8.5",
    title: "Production and service provision",
    description: "Implement production and service provision under controlled conditions."
  },
  {
    sectionNumber: "8.6",
    title: "Release of products and services",
    description: "Implement planned arrangements to verify product and service requirements are met."
  },
  {
    sectionNumber: "8.7",
    title: "Control of nonconforming outputs",
    description: "Ensure nonconforming outputs are identified and controlled."
  },
  {
    sectionNumber: "9",
    title: "Performance Evaluation",
    description: "Requirements for monitoring, measurement, analysis, evaluation, internal audit, and management review."
  },
  {
    sectionNumber: "9.1",
    title: "Monitoring, measurement, analysis and evaluation",
    description: "Determine what needs monitoring and measuring, methods, timing, and evaluation."
  },
  {
    sectionNumber: "9.2",
    title: "Internal audit",
    description: "Conduct internal audits at planned intervals."
  },
  {
    sectionNumber: "9.3",
    title: "Management review",
    description: "Top management review of QMS at planned intervals."
  },
  {
    sectionNumber: "10",
    title: "Improvement",
    description: "Requirements for general improvement, nonconformity/corrective action, and continual improvement."
  },
  {
    sectionNumber: "10.1",
    title: "General",
    description: "Determine and select opportunities for improvement and implement necessary actions."
  },
  {
    sectionNumber: "10.2",
    title: "Nonconformity and corrective action",
    description: "React to nonconformities, evaluate, take action, review effectiveness."
  },
  {
    sectionNumber: "10.3",
    title: "Continual improvement",
    description: "Continually improve QMS suitability, adequacy and effectiveness."
  }
];

// ============================================
// AUDIT QUESTIONS (with scoring criteria)
// ============================================

export const auditQuestions = [
  // ----------------------------------------
  // CLAUSE 4.1 - Understanding the organization and its context
  // ----------------------------------------
  {
    sectionNumber: "4.1",
    standardReference: "ISO 9001:2015 Clause 4.1",
    standardText: "The organization shall determine external and internal issues that are relevant to its purpose and strategic direction and that affect its ability to achieve the intended result(s) of its quality management system. The organization shall monitor and review information about these external and internal issues.",
    auditQuestion: "Has the organization identified and documented external issues (legal, technological, competitive, market, cultural, social, economic) that affect its ability to achieve QMS results?",
    score1Criteria: "No external issues have been identified or documented.",
    score2Criteria: "Some external issues are identified but documentation is incomplete or not linked to strategic direction.",
    score3Criteria: "External issues are comprehensively identified, documented, and clearly linked to strategic direction with regular review."
  },
  {
    sectionNumber: "4.1",
    standardReference: "ISO 9001:2015 Clause 4.1",
    standardText: "The organization shall determine external and internal issues that are relevant to its purpose and strategic direction and that affect its ability to achieve the intended result(s) of its quality management system. The organization shall monitor and review information about these external and internal issues.",
    auditQuestion: "Has the organization identified and documented internal issues (values, culture, knowledge, performance) that affect its ability to achieve QMS results?",
    score1Criteria: "No internal issues have been identified or documented.",
    score2Criteria: "Some internal issues are identified but documentation is incomplete or not systematically reviewed.",
    score3Criteria: "Internal issues are comprehensively identified, documented, and regularly monitored with evidence of review."
  },
  {
    sectionNumber: "4.1",
    standardReference: "ISO 9001:2015 Clause 4.1",
    standardText: "The organization shall determine external and internal issues that are relevant to its purpose and strategic direction and that affect its ability to achieve the intended result(s) of its quality management system. The organization shall monitor and review information about these external and internal issues.",
    auditQuestion: "Is there evidence that external and internal issues are monitored and reviewed at planned intervals?",
    score1Criteria: "No monitoring or review process exists for context issues.",
    score2Criteria: "Issues are reviewed occasionally but not at planned intervals or without documented outcomes.",
    score3Criteria: "Issues are monitored and reviewed at defined intervals with documented evidence of actions taken."
  },

  // ----------------------------------------
  // CLAUSE 4.2 - Understanding the needs and expectations of interested parties
  // ----------------------------------------
  {
    sectionNumber: "4.2",
    standardReference: "ISO 9001:2015 Clause 4.2",
    standardText: "The organization shall determine: a) the interested parties that are relevant to the quality management system; b) the requirements of these interested parties that are relevant to the quality management system. The organization shall monitor and review information about these interested parties and their relevant requirements.",
    auditQuestion: "Has the organization identified all relevant interested parties (customers, employees, suppliers, regulators, shareholders, community)?",
    score1Criteria: "Interested parties have not been identified.",
    score2Criteria: "Some interested parties are identified but the list is incomplete or not documented.",
    score3Criteria: "All relevant interested parties are identified, documented, and categorized appropriately."
  },
  {
    sectionNumber: "4.2",
    standardReference: "ISO 9001:2015 Clause 4.2",
    standardText: "The organization shall determine: a) the interested parties that are relevant to the quality management system; b) the requirements of these interested parties that are relevant to the quality management system. The organization shall monitor and review information about these interested parties and their relevant requirements.",
    auditQuestion: "Are the requirements and expectations of each interested party documented and monitored?",
    score1Criteria: "Requirements of interested parties are not documented.",
    score2Criteria: "Requirements are partially documented but not systematically monitored or updated.",
    score3Criteria: "Requirements are fully documented, regularly monitored, and updated with evidence of review."
  },

  // ----------------------------------------
  // CLAUSE 4.3 - Determining the scope of the QMS
  // ----------------------------------------
  {
    sectionNumber: "4.3",
    standardReference: "ISO 9001:2015 Clause 4.3",
    standardText: "The organization shall determine the boundaries and applicability of the quality management system to establish its scope. When determining this scope, the organization shall consider: a) the external and internal issues referred to in 4.1; b) the requirements of relevant interested parties referred to in 4.2; c) the products and services of the organization.",
    auditQuestion: "Is the QMS scope clearly defined, documented, and available as documented information?",
    score1Criteria: "QMS scope is not defined or documented.",
    score2Criteria: "Scope is defined but incomplete, unclear, or not readily available.",
    score3Criteria: "Scope is clearly defined, documented, available, and includes all products/services and applicable requirements."
  },
  {
    sectionNumber: "4.3",
    standardReference: "ISO 9001:2015 Clause 4.3",
    standardText: "The organization shall determine the boundaries and applicability of the quality management system to establish its scope. When determining this scope, the organization shall consider: a) the external and internal issues referred to in 4.1; b) the requirements of relevant interested parties referred to in 4.2; c) the products and services of the organization.",
    auditQuestion: "If any ISO 9001 requirements are determined not applicable, is there valid justification that does not affect conformity of products/services?",
    score1Criteria: "Exclusions exist without justification or justification is invalid.",
    score2Criteria: "Exclusions are justified but documentation is incomplete or reasoning is weak.",
    score3Criteria: "All exclusions are properly justified, documented, and do not affect product/service conformity or customer satisfaction."
  },

  // ----------------------------------------
  // CLAUSE 4.4 - Quality management system and its processes
  // ----------------------------------------
  {
    sectionNumber: "4.4",
    standardReference: "ISO 9001:2015 Clause 4.4",
    standardText: "The organization shall establish, implement, maintain and continually improve a quality management system, including the processes needed and their interactions, in accordance with the requirements of this International Standard.",
    auditQuestion: "Are QMS processes identified with their inputs, outputs, sequence, and interactions documented?",
    score1Criteria: "QMS processes are not identified or documented.",
    score2Criteria: "Processes are identified but inputs, outputs, or interactions are not fully documented.",
    score3Criteria: "All QMS processes are identified with documented inputs, outputs, sequence, and interactions."
  },
  {
    sectionNumber: "4.4",
    standardReference: "ISO 9001:2015 Clause 4.4",
    standardText: "The organization shall establish, implement, maintain and continually improve a quality management system, including the processes needed and their interactions, in accordance with the requirements of this International Standard.",
    auditQuestion: "Are criteria, methods, and performance indicators established for each process to ensure effective operation and control?",
    score1Criteria: "No criteria or performance indicators exist for processes.",
    score2Criteria: "Some processes have criteria/indicators but coverage is incomplete or inconsistent.",
    score3Criteria: "All processes have defined criteria, methods, and performance indicators that are monitored."
  },
  {
    sectionNumber: "4.4",
    standardReference: "ISO 9001:2015 Clause 4.4",
    standardText: "The organization shall establish, implement, maintain and continually improve a quality management system, including the processes needed and their interactions, in accordance with the requirements of this International Standard.",
    auditQuestion: "Are resources, responsibilities, and authorities assigned for each QMS process?",
    score1Criteria: "Resources and responsibilities are not assigned to processes.",
    score2Criteria: "Some processes have assigned resources/responsibilities but gaps exist.",
    score3Criteria: "All processes have clearly assigned resources, responsibilities, and authorities with documented accountability."
  },
  {
    sectionNumber: "4.4",
    standardReference: "ISO 9001:2015 Clause 4.4",
    standardText: "The organization shall establish, implement, maintain and continually improve a quality management system, including the processes needed and their interactions, in accordance with the requirements of this International Standard.",
    auditQuestion: "Are risks and opportunities addressed for each process and are processes evaluated for improvement?",
    score1Criteria: "Risks and opportunities are not considered for processes.",
    score2Criteria: "Risks/opportunities are considered for some processes but evaluation for improvement is inconsistent.",
    score3Criteria: "All processes have documented risks/opportunities with evidence of evaluation and improvement actions."
  },

  // ----------------------------------------
  // CLAUSE 5.1.1 - Leadership and commitment - General
  // ----------------------------------------
  {
    sectionNumber: "5.1",
    standardReference: "ISO 9001:2015 Clause 5.1.1",
    standardText: "Top management shall demonstrate leadership and commitment with respect to the quality management system by: a) taking accountability for the effectiveness of the quality management system; b) ensuring that the quality policy and quality objectives are established for the quality management system and are compatible with the context and strategic direction of the organization.",
    auditQuestion: "Does top management demonstrate accountability for QMS effectiveness through active engagement and decision-making?",
    score1Criteria: "No evidence of top management accountability or engagement with the QMS.",
    score2Criteria: "Top management shows some involvement but accountability is unclear or inconsistent.",
    score3Criteria: "Top management actively demonstrates accountability with documented decisions, reviews, and resource allocation."
  },
  {
    sectionNumber: "5.1",
    standardReference: "ISO 9001:2015 Clause 5.1.1",
    standardText: "Top management shall demonstrate leadership and commitment with respect to the quality management system by: c) ensuring the integration of the quality management system requirements into the organization's business processes; d) promoting the use of the process approach and risk-based thinking.",
    auditQuestion: "Are QMS requirements integrated into business processes rather than treated as a separate system?",
    score1Criteria: "QMS operates as a separate system disconnected from business processes.",
    score2Criteria: "Partial integration exists but QMS is still perceived as separate from core business.",
    score3Criteria: "QMS requirements are fully integrated into business processes with seamless operation."
  },
  {
    sectionNumber: "5.1",
    standardReference: "ISO 9001:2015 Clause 5.1.1",
    standardText: "Top management shall demonstrate leadership and commitment with respect to the quality management system by: e) ensuring that the resources needed for the quality management system are available; f) communicating the importance of effective quality management and of conforming to the quality management system requirements.",
    auditQuestion: "Are adequate resources provided for the QMS and is the importance of quality management communicated throughout the organization?",
    score1Criteria: "Resources are inadequate and quality importance is not communicated.",
    score2Criteria: "Resources are partially adequate or communication about quality is inconsistent.",
    score3Criteria: "Adequate resources are provided and quality importance is consistently communicated at all levels."
  },
  {
    sectionNumber: "5.1",
    standardReference: "ISO 9001:2015 Clause 5.1.1",
    standardText: "Top management shall demonstrate leadership and commitment with respect to the quality management system by: g) ensuring that the quality management system achieves its intended results; h) engaging, directing and supporting persons to contribute to the effectiveness of the quality management system.",
    auditQuestion: "Does top management engage, direct, and support persons to contribute to QMS effectiveness and continual improvement?",
    score1Criteria: "No evidence of top management engaging or supporting personnel in QMS activities.",
    score2Criteria: "Some engagement exists but support for personnel contribution is limited or inconsistent.",
    score3Criteria: "Top management actively engages and supports all personnel with documented initiatives and improvement promotion."
  },

  // ----------------------------------------
  // CLAUSE 5.1.2 - Leadership and commitment - Customer focus
  // ----------------------------------------
  {
    sectionNumber: "5.1",
    standardReference: "ISO 9001:2015 Clause 5.1.2",
    standardText: "Top management shall demonstrate leadership and commitment with respect to customer focus by ensuring that: a) customer and applicable statutory and regulatory requirements are determined, understood and consistently met; b) the risks and opportunities that can affect conformity of products and services and the ability to enhance customer satisfaction are determined and addressed.",
    auditQuestion: "Are customer requirements and applicable statutory/regulatory requirements determined, understood, and consistently met?",
    score1Criteria: "Customer and regulatory requirements are not systematically determined or met.",
    score2Criteria: "Requirements are determined but understanding or consistent compliance has gaps.",
    score3Criteria: "All customer and regulatory requirements are determined, understood, documented, and consistently met."
  },
  {
    sectionNumber: "5.1",
    standardReference: "ISO 9001:2015 Clause 5.1.2",
    standardText: "Top management shall demonstrate leadership and commitment with respect to customer focus by ensuring that: c) the focus on enhancing customer satisfaction is maintained.",
    auditQuestion: "Is there a maintained focus on enhancing customer satisfaction with measurable actions and improvements?",
    score1Criteria: "No focus on customer satisfaction enhancement.",
    score2Criteria: "Customer satisfaction is considered but enhancement activities are ad-hoc or unmeasured.",
    score3Criteria: "Systematic focus on customer satisfaction with measured improvements and documented enhancement activities."
  },

  // ----------------------------------------
  // CLAUSE 5.2 - Policy
  // ----------------------------------------
  {
    sectionNumber: "5.2",
    standardReference: "ISO 9001:2015 Clause 5.2.1",
    standardText: "Top management shall establish, implement and maintain a quality policy that: a) is appropriate to the purpose and context of the organization and supports its strategic direction; b) provides a framework for setting quality objectives; c) includes a commitment to satisfy applicable requirements; d) includes a commitment to continual improvement of the quality management system.",
    auditQuestion: "Is a quality policy established that is appropriate to the organization's purpose, context, and strategic direction?",
    score1Criteria: "No quality policy exists or it is not appropriate to the organization.",
    score2Criteria: "Quality policy exists but is generic or not clearly linked to organizational context and strategy.",
    score3Criteria: "Quality policy is appropriate, context-specific, and clearly supports strategic direction."
  },
  {
    sectionNumber: "5.2",
    standardReference: "ISO 9001:2015 Clause 5.2.1",
    standardText: "Top management shall establish, implement and maintain a quality policy that: a) is appropriate to the purpose and context of the organization and supports its strategic direction; b) provides a framework for setting quality objectives; c) includes a commitment to satisfy applicable requirements; d) includes a commitment to continual improvement of the quality management system.",
    auditQuestion: "Does the quality policy provide a framework for setting objectives and include commitments to meeting requirements and continual improvement?",
    score1Criteria: "Policy does not provide framework for objectives or lacks required commitments.",
    score2Criteria: "Policy partially addresses objectives framework or commitments are unclear.",
    score3Criteria: "Policy clearly provides objectives framework and includes explicit commitments to requirements and continual improvement."
  },
  {
    sectionNumber: "5.2",
    standardReference: "ISO 9001:2015 Clause 5.2.2",
    standardText: "The quality policy shall: a) be available and be maintained as documented information; b) be communicated, understood and applied within the organization; c) be available to relevant interested parties, as appropriate.",
    auditQuestion: "Is the quality policy documented, communicated, understood within the organization, and available to relevant interested parties?",
    score1Criteria: "Policy is not documented or communicated.",
    score2Criteria: "Policy is documented but communication or understanding is limited.",
    score3Criteria: "Policy is documented, effectively communicated, understood by personnel, and available to interested parties."
  },

  // ----------------------------------------
  // CLAUSE 5.3 - Organizational roles, responsibilities and authorities
  // ----------------------------------------
  {
    sectionNumber: "5.3",
    standardReference: "ISO 9001:2015 Clause 5.3",
    standardText: "Top management shall ensure that the responsibilities and authorities for relevant roles are assigned, communicated and understood within the organization. Top management shall assign the responsibility and authority for: a) ensuring that the quality management system conforms to the requirements of this International Standard; b) ensuring that the processes are delivering their intended outputs.",
    auditQuestion: "Are responsibilities and authorities for QMS roles clearly assigned, communicated, and understood?",
    score1Criteria: "Responsibilities and authorities are not defined or communicated.",
    score2Criteria: "Some responsibilities are assigned but communication or understanding is incomplete.",
    score3Criteria: "All QMS responsibilities and authorities are clearly assigned, documented, communicated, and understood."
  },
  {
    sectionNumber: "5.3",
    standardReference: "ISO 9001:2015 Clause 5.3",
    standardText: "Top management shall assign the responsibility and authority for: c) reporting on the performance of the quality management system and on opportunities for improvement in particular to top management; d) ensuring the promotion of customer focus throughout the organization; e) ensuring that the integrity of the quality management system is maintained when changes to the quality management system are planned and implemented.",
    auditQuestion: "Is there assigned responsibility for reporting QMS performance to top management and ensuring customer focus throughout the organization?",
    score1Criteria: "No assigned responsibility for QMS reporting or customer focus promotion.",
    score2Criteria: "Responsibilities exist but reporting or customer focus promotion is inconsistent.",
    score3Criteria: "Clear responsibilities assigned with regular QMS performance reporting and active customer focus promotion."
  },

  // ----------------------------------------
  // CLAUSE 6.1 - Actions to address risks and opportunities
  // ----------------------------------------
  {
    sectionNumber: "6.1",
    standardReference: "ISO 9001:2015 Clause 6.1.1",
    standardText: "When planning for the quality management system, the organization shall consider the issues referred to in 4.1 and the requirements referred to in 4.2 and determine the risks and opportunities that need to be addressed to: a) give assurance that the quality management system can achieve its intended result(s); b) enhance desirable effects; c) prevent, or reduce, undesired effects; d) achieve improvement.",
    auditQuestion: "Has the organization determined risks and opportunities considering the context (4.1) and interested party requirements (4.2)?",
    score1Criteria: "No formal risk and opportunity assessment exists.",
    score2Criteria: "Some risks/opportunities identified but not linked to context or interested parties.",
    score3Criteria: "Comprehensive risk and opportunity assessment documented with clear links to context and interested party requirements."
  },
  {
    sectionNumber: "6.1",
    standardReference: "ISO 9001:2015 Clause 6.1.2",
    standardText: "The organization shall plan: a) actions to address these risks and opportunities; b) how to: 1) integrate and implement the actions into its quality management system processes; 2) evaluate the effectiveness of these actions.",
    auditQuestion: "Are actions planned to address risks and opportunities, integrated into QMS processes, and evaluated for effectiveness?",
    score1Criteria: "No actions planned for risks and opportunities.",
    score2Criteria: "Actions exist but not integrated into processes or effectiveness not evaluated.",
    score3Criteria: "Actions are planned, integrated into QMS processes, and regularly evaluated for effectiveness with documented results."
  },

  // ----------------------------------------
  // CLAUSE 6.2 - Quality objectives and planning to achieve them
  // ----------------------------------------
  {
    sectionNumber: "6.2",
    standardReference: "ISO 9001:2015 Clause 6.2.1",
    standardText: "The organization shall establish quality objectives at relevant functions, levels and processes needed for the quality management system. The quality objectives shall: a) be consistent with the quality policy; b) be measurable; c) take into account applicable requirements; d) be relevant to conformity of products and services and to enhancement of customer satisfaction; e) be monitored; f) be communicated; g) be updated as appropriate.",
    auditQuestion: "Are quality objectives established that are consistent with policy, measurable, and relevant to product/service conformity and customer satisfaction?",
    score1Criteria: "Quality objectives are not established or are not measurable.",
    score2Criteria: "Objectives exist but are not fully aligned with policy or are difficult to measure.",
    score3Criteria: "SMART quality objectives are established, consistent with policy, and clearly relevant to conformity and customer satisfaction."
  },
  {
    sectionNumber: "6.2",
    standardReference: "ISO 9001:2015 Clause 6.2.2",
    standardText: "When planning how to achieve its quality objectives, the organization shall determine: a) what will be done; b) what resources will be required; c) who will be responsible; d) when it will be completed; e) how the results will be evaluated.",
    auditQuestion: "Is planning documented for achieving quality objectives including actions, resources, responsibilities, timeframes, and evaluation methods?",
    score1Criteria: "No planning exists for achieving quality objectives.",
    score2Criteria: "Partial planning exists but key elements (resources, responsibilities, timeframes) are missing.",
    score3Criteria: "Complete planning documented with actions, resources, responsibilities, timeframes, and evaluation methods."
  },
  {
    sectionNumber: "6.2",
    standardReference: "ISO 9001:2015 Clause 6.2.1",
    standardText: "The quality objectives shall: e) be monitored; f) be communicated; g) be updated as appropriate.",
    auditQuestion: "Are quality objectives monitored, communicated throughout the organization, and updated when appropriate?",
    score1Criteria: "Objectives are not monitored or communicated.",
    score2Criteria: "Some monitoring occurs but communication is limited or updates are irregular.",
    score3Criteria: "Objectives are systematically monitored, effectively communicated, and updated based on performance and changing conditions."
  },

  // ----------------------------------------
  // CLAUSE 6.3 - Planning of changes
  // ----------------------------------------
  {
    sectionNumber: "6.3",
    standardReference: "ISO 9001:2015 Clause 6.3",
    standardText: "When the organization determines the need for changes to the quality management system, the changes shall be carried out in a planned manner. The organization shall consider: a) the purpose of the changes and their potential consequences; b) the integrity of the quality management system; c) the availability of resources; d) the allocation or reallocation of responsibilities and authorities.",
    auditQuestion: "When changes to the QMS are needed, are they planned considering purpose, consequences, system integrity, resources, and responsibilities?",
    score1Criteria: "Changes are made without planning or consideration of impacts.",
    score2Criteria: "Some planning occurs but not all factors are systematically considered.",
    score3Criteria: "All QMS changes are systematically planned with documented consideration of purpose, consequences, integrity, resources, and responsibilities."
  },

  // ----------------------------------------
  // CLAUSE 7.1.1 - Resources - General
  // ----------------------------------------
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.1",
    standardText: "The organization shall determine and provide the resources needed for the establishment, implementation, maintenance and continual improvement of the quality management system. The organization shall consider: a) the capabilities of, and constraints on, existing internal resources; b) what needs to be obtained from external providers.",
    auditQuestion: "Has the organization determined and provided adequate resources for QMS establishment, implementation, maintenance, and improvement?",
    score1Criteria: "Resources are not systematically determined or significant gaps exist.",
    score2Criteria: "Resources are partially determined but gaps or constraints are not fully addressed.",
    score3Criteria: "Resources are systematically determined and provided with consideration of internal capabilities and external provider needs."
  },

  // ----------------------------------------
  // CLAUSE 7.1.2 - Resources - People
  // ----------------------------------------
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.2",
    standardText: "The organization shall determine and provide the persons necessary for the effective implementation of its quality management system and for the operation and control of its processes.",
    auditQuestion: "Are adequate personnel determined and provided for effective QMS implementation and process operation?",
    score1Criteria: "Personnel needs are not determined or significant staffing gaps exist.",
    score2Criteria: "Personnel needs are determined but staffing is not always adequate.",
    score3Criteria: "Personnel needs are determined and consistently met with appropriate staffing for all QMS processes."
  },

  // ----------------------------------------
  // CLAUSE 7.1.3 - Resources - Infrastructure
  // ----------------------------------------
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.3",
    standardText: "The organization shall determine, provide and maintain the infrastructure necessary for the operation of its processes and to achieve conformity of products and services. NOTE Infrastructure can include: a) buildings and associated utilities; b) equipment, including hardware and software; c) transportation resources; d) information and communication technology.",
    auditQuestion: "Is infrastructure (buildings, equipment, IT systems, transportation) determined, provided, and maintained for process operation and product/service conformity?",
    score1Criteria: "Infrastructure needs are not determined or significant maintenance gaps exist.",
    score2Criteria: "Infrastructure is determined but provision or maintenance is inconsistent.",
    score3Criteria: "Infrastructure is systematically determined, provided, and maintained with documented maintenance programs."
  },

  // ----------------------------------------
  // CLAUSE 7.1.4 - Resources - Environment for operation of processes
  // ----------------------------------------
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.4",
    standardText: "The organization shall determine, provide and maintain the environment necessary for the operation of its processes and to achieve conformity of products and services. NOTE A suitable environment can be a combination of human and physical factors, such as: a) social (e.g. non-discriminatory, calm, non-confrontational); b) psychological (e.g. stress-reducing, burnout prevention, emotionally protective); c) physical (e.g. temperature, heat, humidity, light, airflow, hygiene, noise).",
    auditQuestion: "Is the work environment (social, psychological, physical factors) determined, provided, and maintained for process operation and product/service conformity?",
    score1Criteria: "Work environment factors are not considered or significant issues exist.",
    score2Criteria: "Environment is partially addressed but some factors are not controlled.",
    score3Criteria: "Work environment is systematically determined and maintained with documented controls for all relevant factors."
  },

  // ----------------------------------------
  // CLAUSE 7.1.5 - Resources - Monitoring and measuring resources
  // ----------------------------------------
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.5.1",
    standardText: "The organization shall determine and provide the resources needed to ensure valid and reliable results when monitoring or measuring is used to verify the conformity of products and services to requirements. The organization shall ensure that the resources provided: a) are suitable for the specific type of monitoring and measurement activities being undertaken; b) are maintained to ensure their continued fitness for their purpose.",
    auditQuestion: "Are monitoring and measuring resources determined, suitable for their purpose, and maintained to ensure continued fitness?",
    score1Criteria: "Monitoring/measuring resources are not controlled or calibration is not managed.",
    score2Criteria: "Resources are identified but suitability or maintenance has gaps.",
    score3Criteria: "Resources are determined, suitable, and maintained with documented evidence of continued fitness for purpose."
  },
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.5.2",
    standardText: "When measurement traceability is a requirement, or is considered by the organization to be an essential part of providing confidence in the validity of measurement results, measuring equipment shall be: a) calibrated or verified, or both, at specified intervals, or prior to use, against measurement standards traceable to international or national measurement standards; b) identified to determine their status; c) safeguarded from adjustments, damage or deterioration that would invalidate the calibration status and subsequent measurement results.",
    auditQuestion: "Where measurement traceability is required, is equipment calibrated/verified against traceable standards, identified for status, and safeguarded from damage?",
    score1Criteria: "Calibration is not performed or traceability is not established.",
    score2Criteria: "Calibration occurs but status identification or safeguarding is incomplete.",
    score3Criteria: "Equipment is calibrated against traceable standards, clearly identified for status, and safeguarded with documented records."
  },

  // ----------------------------------------
  // CLAUSE 7.1.6 - Resources - Organizational knowledge
  // ----------------------------------------
  {
    sectionNumber: "7.1",
    standardReference: "ISO 9001:2015 Clause 7.1.6",
    standardText: "The organization shall determine the knowledge necessary for the operation of its processes and to achieve conformity of products and services. This knowledge shall be maintained and be made available to the extent necessary. When addressing changing needs and trends, the organization shall consider its current knowledge and determine how to acquire or access any necessary additional knowledge and required updates.",
    auditQuestion: "Is organizational knowledge determined, maintained, made available, and updated to address changing needs?",
    score1Criteria: "Organizational knowledge is not systematically managed.",
    score2Criteria: "Some knowledge management exists but gaps in capture, availability, or updates.",
    score3Criteria: "Knowledge is systematically determined, maintained, made available, and updated with documented processes for knowledge acquisition."
  },

  // ----------------------------------------
  // CLAUSE 7.2 - Competence
  // ----------------------------------------
  {
    sectionNumber: "7.2",
    standardReference: "ISO 9001:2015 Clause 7.2",
    standardText: "The organization shall: a) determine the necessary competence of person(s) doing work under its control that affects the performance and effectiveness of the quality management system; b) ensure that these persons are competent on the basis of appropriate education, training, or experience; c) where applicable, take actions to acquire the necessary competence, and evaluate the effectiveness of the actions taken; d) retain appropriate documented information as evidence of competence.",
    auditQuestion: "Is competence determined for persons affecting QMS performance, and are persons ensured competent through education, training, or experience?",
    score1Criteria: "Competence requirements are not defined or competence is not verified.",
    score2Criteria: "Competence is partially managed but gaps exist in determination or verification.",
    score3Criteria: "Competence is systematically determined and verified with documented evidence for all relevant personnel."
  },
  {
    sectionNumber: "7.2",
    standardReference: "ISO 9001:2015 Clause 7.2",
    standardText: "The organization shall: a) determine the necessary competence of person(s) doing work under its control that affects the performance and effectiveness of the quality management system; b) ensure that these persons are competent on the basis of appropriate education, training, or experience; c) where applicable, take actions to acquire the necessary competence, and evaluate the effectiveness of the actions taken; d) retain appropriate documented information as evidence of competence.",
    auditQuestion: "Are actions taken to acquire necessary competence evaluated for effectiveness, with documented information retained as evidence?",
    score1Criteria: "No actions taken to address competence gaps or no documentation exists.",
    score2Criteria: "Actions are taken but effectiveness evaluation or documentation is incomplete.",
    score3Criteria: "Actions to acquire competence are taken, evaluated for effectiveness, and documented with evidence retained."
  },

  // ----------------------------------------
  // CLAUSE 7.3 - Awareness
  // ----------------------------------------
  {
    sectionNumber: "7.3",
    standardReference: "ISO 9001:2015 Clause 7.3",
    standardText: "The organization shall ensure that persons doing work under the organization's control are aware of: a) the quality policy; b) relevant quality objectives; c) their contribution to the effectiveness of the quality management system, including the benefits of improved performance; d) the implications of not conforming with the quality management system requirements.",
    auditQuestion: "Are persons aware of the quality policy, relevant objectives, their contribution to QMS effectiveness, and implications of non-conformity?",
    score1Criteria: "Personnel are not aware of QMS requirements or their role.",
    score2Criteria: "Some awareness exists but not consistently demonstrated across the organization.",
    score3Criteria: "Personnel demonstrate clear awareness of policy, objectives, their contribution, and implications of non-conformity."
  },

  // ----------------------------------------
  // CLAUSE 7.4 - Communication
  // ----------------------------------------
  {
    sectionNumber: "7.4",
    standardReference: "ISO 9001:2015 Clause 7.4",
    standardText: "The organization shall determine the internal and external communications relevant to the quality management system, including: a) on what it will communicate; b) when to communicate; c) with whom to communicate; d) how to communicate; e) who communicates.",
    auditQuestion: "Has the organization determined what, when, with whom, how, and who communicates regarding QMS matters internally and externally?",
    score1Criteria: "QMS communication is ad-hoc and not planned.",
    score2Criteria: "Some communication planning exists but not all elements are addressed.",
    score3Criteria: "Communication is systematically planned covering what, when, with whom, how, and who for both internal and external communications."
  },

  // ----------------------------------------
  // CLAUSE 7.5 - Documented information
  // ----------------------------------------
  {
    sectionNumber: "7.5",
    standardReference: "ISO 9001:2015 Clause 7.5.1",
    standardText: "The organization's quality management system shall include: a) documented information required by this International Standard; b) documented information determined by the organization as being necessary for the effectiveness of the quality management system.",
    auditQuestion: "Does the QMS include all documented information required by ISO 9001 and additional documentation determined necessary for effectiveness?",
    score1Criteria: "Required documented information is missing or inadequate.",
    score2Criteria: "Most required documentation exists but gaps or inadequacies identified.",
    score3Criteria: "All required documented information exists plus additional documentation supporting QMS effectiveness."
  },
  {
    sectionNumber: "7.5",
    standardReference: "ISO 9001:2015 Clause 7.5.2",
    standardText: "When creating and updating documented information, the organization shall ensure appropriate: a) identification and description (e.g. a title, date, author, or reference number); b) format (e.g. language, software version, graphics) and media (e.g. paper, electronic); c) review and approval for suitability and adequacy.",
    auditQuestion: "Is documented information appropriately identified, described, formatted, and reviewed/approved for suitability and adequacy?",
    score1Criteria: "Documentation lacks identification, proper format, or approval controls.",
    score2Criteria: "Some controls exist but identification, format, or approval process has gaps.",
    score3Criteria: "All documented information is properly identified, formatted, and approved with documented review processes."
  },
  {
    sectionNumber: "7.5",
    standardReference: "ISO 9001:2015 Clause 7.5.3",
    standardText: "Documented information required by the quality management system and by this International Standard shall be controlled to ensure: a) it is available and suitable for use, where and when it is needed; b) it is adequately protected (e.g. from loss of confidentiality, improper use, or loss of integrity).",
    auditQuestion: "Is documented information controlled to ensure availability, suitability for use, and adequate protection from loss or improper use?",
    score1Criteria: "Document control is inadequate with availability or protection issues.",
    score2Criteria: "Document control exists but gaps in availability or protection identified.",
    score3Criteria: "Comprehensive document control ensures availability, suitability, and protection with controlled distribution and access."
  },

  // ----------------------------------------
  // CLAUSE 8.1 - Operational planning and control
  // ----------------------------------------
  {
    sectionNumber: "8.1",
    standardReference: "ISO 9001:2015 Clause 8.1",
    standardText: "The organization shall plan, implement and control the processes needed to meet the requirements for the provision of products and services, and to implement the actions determined in Clause 6, by: a) determining the requirements for the products and services; b) establishing criteria for the processes and the acceptance of products and services; c) determining the resources needed to achieve conformity to the product and service requirements; d) implementing control of the processes in accordance with the criteria; e) determining, maintaining and retaining documented information.",
    auditQuestion: "Are operational processes planned and controlled with determined requirements, criteria, resources, and documented information?",
    score1Criteria: "Operational planning is inadequate or not systematically applied.",
    score2Criteria: "Planning exists but gaps in criteria, control, or documentation.",
    score3Criteria: "Comprehensive operational planning with clear requirements, criteria, resources, and documented information."
  },
  {
    sectionNumber: "8.1",
    standardReference: "ISO 9001:2015 Clause 8.1",
    standardText: "The organization shall control planned changes and review the consequences of unintended changes, taking action to mitigate any adverse effects, as necessary. The organization shall ensure that outsourced processes are controlled.",
    auditQuestion: "Are planned changes controlled, unintended changes reviewed with mitigating actions, and outsourced processes controlled?",
    score1Criteria: "Changes are not controlled and outsourced processes are not managed.",
    score2Criteria: "Some change control exists but unintended changes or outsourced processes have gaps.",
    score3Criteria: "Planned changes are controlled, unintended changes are reviewed with documented actions, and outsourced processes are effectively controlled."
  },

  // ----------------------------------------
  // CLAUSE 8.2 - Requirements for products and services
  // ----------------------------------------
  {
    sectionNumber: "8.2",
    standardReference: "ISO 9001:2015 Clause 8.2.1",
    standardText: "Communication with customers shall include: a) providing information relating to products and services; b) handling enquiries, contracts or orders, including changes; c) obtaining customer feedback relating to products and services, including customer complaints; d) handling or controlling customer property; e) establishing specific requirements for contingency actions, when relevant.",
    auditQuestion: "Is customer communication effective covering product information, enquiries, feedback, complaints, customer property, and contingency requirements?",
    score1Criteria: "Customer communication is inadequate or not systematically managed.",
    score2Criteria: "Some customer communication exists but gaps in feedback or complaint handling.",
    score3Criteria: "Comprehensive customer communication covering all required elements with documented processes."
  },
  {
    sectionNumber: "8.2",
    standardReference: "ISO 9001:2015 Clause 8.2.2",
    standardText: "When determining the requirements for the products and services to be offered to customers, the organization shall ensure that: a) the requirements for the products and services are defined, including any applicable statutory and regulatory requirements and those considered necessary by the organization; b) the organization can meet the claims for the products and services it offers.",
    auditQuestion: "Are product/service requirements determined including statutory, regulatory, and organization-determined requirements with confidence in meeting claims?",
    score1Criteria: "Product/service requirements are not systematically determined.",
    score2Criteria: "Requirements are determined but gaps in regulatory requirements or claim verification.",
    score3Criteria: "All requirements are comprehensively determined with confidence in meeting all claims."
  },
  {
    sectionNumber: "8.2",
    standardReference: "ISO 9001:2015 Clause 8.2.3",
    standardText: "The organization shall ensure that it has the ability to meet the requirements for products and services to be offered to customers. The organization shall conduct a review before committing to supply products and services to a customer.",
    auditQuestion: "Is a review conducted before commitment to supply, ensuring ability to meet requirements and resolving any differences?",
    score1Criteria: "No review before commitment or requirements not verified.",
    score2Criteria: "Reviews occur but are not comprehensive or differences not always resolved.",
    score3Criteria: "Comprehensive review before commitment with documented resolution of differences and retained records."
  },

  // ----------------------------------------
  // CLAUSE 8.3 - Design and development
  // ----------------------------------------
  {
    sectionNumber: "8.3",
    standardReference: "ISO 9001:2015 Clause 8.3.1",
    standardText: "The organization shall establish, implement and maintain a design and development process that is appropriate to ensure the subsequent provision of products and services.",
    auditQuestion: "Is a design and development process established that is appropriate for ensuring subsequent product/service provision?",
    score1Criteria: "No design and development process exists or it is inadequate.",
    score2Criteria: "Process exists but is not comprehensive or appropriately controlled.",
    score3Criteria: "Comprehensive design and development process is established, implemented, and maintained."
  },
  {
    sectionNumber: "8.3",
    standardReference: "ISO 9001:2015 Clause 8.3.2",
    standardText: "In determining the stages and controls for design and development, the organization shall consider: a) the nature, duration and complexity of the design and development activities; b) the required process stages, including applicable design and development reviews; c) the required design and development verification and validation activities; d) the responsibilities and authorities involved in the design and development process.",
    auditQuestion: "Does design planning consider nature/duration/complexity, required stages, verification/validation, and responsibilities?",
    score1Criteria: "Design planning does not consider required elements.",
    score2Criteria: "Planning addresses some elements but gaps in verification/validation or responsibilities.",
    score3Criteria: "Comprehensive design planning considering all elements with documented stages and controls."
  },
  {
    sectionNumber: "8.3",
    standardReference: "ISO 9001:2015 Clause 8.3.3",
    standardText: "The organization shall determine the requirements essential for the specific types of products and services to be designed and developed.",
    auditQuestion: "Are design inputs determined including functional, performance, statutory, regulatory requirements, and consequences of failure?",
    score1Criteria: "Design inputs are not determined or are incomplete.",
    score2Criteria: "Some inputs are determined but gaps in regulatory or failure consequence considerations.",
    score3Criteria: "All design inputs are comprehensively determined, documented, and adequate for design requirements."
  },
  {
    sectionNumber: "8.3",
    standardReference: "ISO 9001:2015 Clause 8.3.4",
    standardText: "The organization shall apply controls to the design and development process to ensure that: a) the results to be achieved are defined; b) reviews are conducted to evaluate the ability of the results of design and development to meet requirements; c) verification activities are conducted to ensure that the design and development outputs meet the input requirements; d) validation activities are conducted to ensure that the resulting products and services meet the requirements for the specified application or intended use.",
    auditQuestion: "Are design controls applied including reviews, verification that outputs meet inputs, and validation that products/services meet intended use?",
    score1Criteria: "Design controls are not applied or are inadequate.",
    score2Criteria: "Some controls exist but gaps in review, verification, or validation.",
    score3Criteria: "Comprehensive design controls with documented reviews, verification, and validation activities."
  },
  {
    sectionNumber: "8.3",
    standardReference: "ISO 9001:2015 Clause 8.3.6",
    standardText: "The organization shall identify, review and control changes made during, or subsequent to, the design and development of products and services, to the extent necessary to ensure that there is no adverse impact on conformity to requirements.",
    auditQuestion: "Are design changes identified, reviewed, controlled, and documented to ensure no adverse impact on conformity?",
    score1Criteria: "Design changes are not controlled or documented.",
    score2Criteria: "Some change control exists but review or documentation is incomplete.",
    score3Criteria: "Design changes are systematically identified, reviewed, controlled, and documented with retained information."
  },

  // ----------------------------------------
  // CLAUSE 8.4 - Control of externally provided processes, products and services
  // ----------------------------------------
  {
    sectionNumber: "8.4",
    standardReference: "ISO 9001:2015 Clause 8.4.1",
    standardText: "The organization shall ensure that externally provided processes, products and services conform to requirements. The organization shall determine the controls to be applied to externally provided processes, products and services.",
    auditQuestion: "Are controls determined for externally provided processes, products, and services to ensure conformity to requirements?",
    score1Criteria: "No controls exist for external providers.",
    score2Criteria: "Some controls exist but not comprehensive or consistently applied.",
    score3Criteria: "Comprehensive controls are determined and applied to all externally provided processes, products, and services."
  },
  {
    sectionNumber: "8.4",
    standardReference: "ISO 9001:2015 Clause 8.4.1",
    standardText: "The organization shall determine and apply criteria for the evaluation, selection, monitoring of performance, and re-evaluation of external providers, based on their ability to provide processes or products and services in accordance with requirements. The organization shall retain documented information of these activities.",
    auditQuestion: "Are criteria established for evaluation, selection, performance monitoring, and re-evaluation of external providers with documented information retained?",
    score1Criteria: "No evaluation criteria or documentation for external providers.",
    score2Criteria: "Some evaluation exists but criteria are incomplete or documentation gaps.",
    score3Criteria: "Comprehensive criteria for evaluation, selection, monitoring, and re-evaluation with documented information retained."
  },
  {
    sectionNumber: "8.4",
    standardReference: "ISO 9001:2015 Clause 8.4.3",
    standardText: "The organization shall ensure the adequacy of requirements prior to their communication to the external provider. The organization shall communicate to external providers its requirements for: a) the processes, products and services to be provided; b) the approval of products and services, methods, processes and equipment, and release of products and services; c) competence, including any required qualification of persons; d) the external providers' interactions with the organization; e) control and monitoring of the external providers' performance to be applied by the organization; f) verification or validation activities that the organization, or its customer, intends to perform at the external providers' premises.",
    auditQuestion: "Are requirements adequately communicated to external providers including approval methods, competence, interactions, and verification activities?",
    score1Criteria: "Requirements are not communicated to external providers.",
    score2Criteria: "Some requirements communicated but gaps in approval methods or verification.",
    score3Criteria: "All requirements are comprehensively communicated to external providers with documented confirmation."
  },

  // ----------------------------------------
  // CLAUSE 8.5 - Production and service provision
  // ----------------------------------------
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.1",
    standardText: "The organization shall implement production and service provision under controlled conditions. Controlled conditions shall include, as applicable: a) the availability of documented information that defines the characteristics of the products to be produced, the services to be provided, or the activities to be performed and the results to be achieved; b) the availability and use of suitable monitoring and measuring resources; c) the implementation of monitoring and measurement activities at appropriate stages.",
    auditQuestion: "Is production/service provision implemented under controlled conditions with documented information, monitoring resources, and measurement activities?",
    score1Criteria: "Production/service provision is not controlled or documented.",
    score2Criteria: "Some controls exist but gaps in documentation or monitoring.",
    score3Criteria: "Comprehensive controlled conditions with documented information and systematic monitoring and measurement."
  },
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.1",
    standardText: "Controlled conditions shall include, as applicable: d) the use of suitable infrastructure and environment for the operation of processes; e) the appointment of competent persons, including any required qualification; f) the validation, and periodic revalidation, of the ability to achieve planned results for any processes for production and service provision, where the resulting output cannot be verified by subsequent monitoring or measurement; g) the implementation of actions to prevent human error; h) the implementation of release, delivery and post-delivery activities.",
    auditQuestion: "Are suitable infrastructure, competent persons, process validation, human error prevention, and release/delivery activities controlled?",
    score1Criteria: "Key controlled conditions are not addressed.",
    score2Criteria: "Some conditions controlled but gaps in validation or error prevention.",
    score3Criteria: "All controlled conditions are systematically addressed with documented evidence."
  },
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.2",
    standardText: "The organization shall use suitable means to identify outputs when it is necessary to ensure the conformity of products and services. The organization shall identify the status of outputs with respect to monitoring and measurement requirements throughout production and service provision. The organization shall control the unique identification of the outputs when traceability is a requirement, and shall retain the documented information necessary to enable traceability.",
    auditQuestion: "Are outputs identified, status tracked through production/service provision, and traceability maintained where required?",
    score1Criteria: "Output identification and traceability are not managed.",
    score2Criteria: "Some identification exists but traceability or status tracking has gaps.",
    score3Criteria: "Outputs are systematically identified, status tracked, and traceability maintained with documented information."
  },
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.3",
    standardText: "The organization shall exercise care with property belonging to customers or external providers while it is under the organization's control or being used by the organization. The organization shall identify, verify, protect and safeguard customers' or external providers' property provided for use or incorporation into the products and services.",
    auditQuestion: "Is customer or external provider property identified, verified, protected, and safeguarded while under the organization's control?",
    score1Criteria: "Customer/external provider property is not controlled.",
    score2Criteria: "Some controls exist but identification or protection has gaps.",
    score3Criteria: "Customer/external provider property is systematically identified, verified, protected, and safeguarded with documented records."
  },
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.4",
    standardText: "The organization shall preserve the outputs during production and service provision, to the extent necessary to ensure conformity to requirements. NOTE Preservation can include identification, handling, contamination control, packaging, storage, transmission or transportation, and protection.",
    auditQuestion: "Are outputs preserved during production and service provision to ensure conformity (handling, storage, packaging, protection)?",
    score1Criteria: "Preservation of outputs is not controlled.",
    score2Criteria: "Some preservation exists but gaps in handling, storage, or protection.",
    score3Criteria: "Outputs are systematically preserved with documented controls for handling, storage, packaging, and protection."
  },
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.5",
    standardText: "The organization shall meet the requirements for post-delivery activities associated with the products and services. In determining the extent of post-delivery activities that are required, the organization shall consider: a) statutory and regulatory requirements; b) the potential undesired consequences associated with its products and services; c) the nature, use and intended lifetime of its products and services; d) customer requirements; e) customer feedback.",
    auditQuestion: "Are post-delivery activities determined and implemented considering statutory requirements, potential consequences, product nature, and customer feedback?",
    score1Criteria: "Post-delivery activities are not considered or implemented.",
    score2Criteria: "Some post-delivery activities exist but not all factors are considered.",
    score3Criteria: "Post-delivery activities are comprehensively determined and implemented considering all required factors."
  },
  {
    sectionNumber: "8.5",
    standardReference: "ISO 9001:2015 Clause 8.5.6",
    standardText: "The organization shall review and control changes for production or service provision, to the extent necessary to ensure continuing conformity with requirements. The organization shall retain documented information describing the results of the review of changes, the person(s) authorizing the change, and any necessary actions arising from the review.",
    auditQuestion: "Are changes to production/service provision reviewed and controlled with documented results, authorization, and necessary actions?",
    score1Criteria: "Production/service changes are not reviewed or controlled.",
    score2Criteria: "Some change control exists but documentation or authorization is incomplete.",
    score3Criteria: "Changes are systematically reviewed and controlled with documented results, authorization, and actions."
  },

  // ----------------------------------------
  // CLAUSE 8.6 - Release of products and services
  // ----------------------------------------
  {
    sectionNumber: "8.6",
    standardReference: "ISO 9001:2015 Clause 8.6",
    standardText: "The organization shall implement planned arrangements, at appropriate stages, to verify that the product and service requirements have been met. The release of products and services to the customer shall not proceed until the planned arrangements have been satisfactorily completed, unless otherwise approved by a relevant authority and, as applicable, by the customer. The organization shall retain documented information on the release of products and services.",
    auditQuestion: "Are planned arrangements implemented to verify requirements are met, with release held until completion and documented information retained?",
    score1Criteria: "Release controls are not implemented or documented.",
    score2Criteria: "Some release controls exist but verification or documentation has gaps.",
    score3Criteria: "Comprehensive release controls with documented verification and evidence of conformity and authorization."
  },

  // ----------------------------------------
  // CLAUSE 8.7 - Control of nonconforming outputs
  // ----------------------------------------
  {
    sectionNumber: "8.7",
    standardReference: "ISO 9001:2015 Clause 8.7.1",
    standardText: "The organization shall ensure that outputs that do not conform to their requirements are identified and controlled to prevent their unintended use or delivery. The organization shall take appropriate action based on the nature of the nonconformity and its effect on the conformity of products and services. This shall also apply to nonconforming products and services detected after delivery of products, during or after the provision of services.",
    auditQuestion: "Are nonconforming outputs identified and controlled to prevent unintended use or delivery, with appropriate action taken?",
    score1Criteria: "Nonconforming outputs are not identified or controlled.",
    score2Criteria: "Some control exists but identification or action is inconsistent.",
    score3Criteria: "Nonconforming outputs are systematically identified, controlled, and appropriate action taken based on nature and effect."
  },
  {
    sectionNumber: "8.7",
    standardReference: "ISO 9001:2015 Clause 8.7.2",
    standardText: "The organization shall retain documented information that: a) describes the nonconformity; b) describes the actions taken; c) describes any concessions obtained; d) identifies the authority deciding the action in respect of the nonconformity.",
    auditQuestion: "Is documented information retained describing nonconformities, actions taken, concessions, and decision authority?",
    score1Criteria: "No documented information on nonconformities.",
    score2Criteria: "Some documentation exists but descriptions or authority identification is incomplete.",
    score3Criteria: "Comprehensive documented information on all nonconformities including descriptions, actions, concessions, and authority."
  },

  // ----------------------------------------
  // CLAUSE 9.1.1 - Monitoring, measurement, analysis and evaluation - General
  // ----------------------------------------
  {
    sectionNumber: "9.1",
    standardReference: "ISO 9001:2015 Clause 9.1.1",
    standardText: "The organization shall determine: a) what needs to be monitored and measured; b) the methods for monitoring, measurement, analysis and evaluation needed to ensure valid results; c) when the monitoring and measuring shall be performed; d) when the results from monitoring and measurement shall be analysed and evaluated. The organization shall evaluate the performance and the effectiveness of the quality management system. The organization shall retain appropriate documented information as evidence of the results.",
    auditQuestion: "Has the organization determined what to monitor/measure, methods, timing, and analysis/evaluation with documented results?",
    score1Criteria: "Monitoring and measurement is not systematically determined or documented.",
    score2Criteria: "Some monitoring exists but methods, timing, or analysis is incomplete.",
    score3Criteria: "Comprehensive monitoring and measurement with defined methods, timing, analysis, and documented results."
  },

  // ----------------------------------------
  // CLAUSE 9.1.2 - Customer satisfaction
  // ----------------------------------------
  {
    sectionNumber: "9.1",
    standardReference: "ISO 9001:2015 Clause 9.1.2",
    standardText: "The organization shall monitor customers' perceptions of the degree to which their needs and expectations have been fulfilled. The organization shall determine the methods for obtaining, monitoring and reviewing this information. NOTE Examples of monitoring customer perceptions can include customer surveys, customer feedback on delivered products and services, meetings with customers, market-share analysis, compliments, warranty claims and dealer reports.",
    auditQuestion: "Does the organization monitor customer perceptions using determined methods (surveys, feedback, meetings, complaints, compliments)?",
    score1Criteria: "Customer satisfaction is not monitored.",
    score2Criteria: "Some monitoring exists but methods are limited or not systematic.",
    score3Criteria: "Systematic customer satisfaction monitoring using multiple methods with analysis and documented action."
  },

  // ----------------------------------------
  // CLAUSE 9.1.3 - Analysis and evaluation
  // ----------------------------------------
  {
    sectionNumber: "9.1",
    standardReference: "ISO 9001:2015 Clause 9.1.3",
    standardText: "The organization shall analyse and evaluate appropriate data and information arising from monitoring and measurement. The results of analysis shall be used to evaluate: a) conformity of products and services; b) the degree of customer satisfaction; c) the performance and effectiveness of the quality management system; d) if planning has been implemented effectively; e) the effectiveness of actions taken to address risks and opportunities; f) the performance of external providers; g) the need for improvements to the quality management system.",
    auditQuestion: "Is data analyzed and evaluated to assess conformity, customer satisfaction, QMS effectiveness, planning, risk actions, and external provider performance?",
    score1Criteria: "Data analysis is not performed or is inadequate.",
    score2Criteria: "Some analysis exists but not all required areas are evaluated.",
    score3Criteria: "Comprehensive data analysis covering all required areas with documented evaluation and improvement identification."
  },

  // ----------------------------------------
  // CLAUSE 9.2 - Internal audit
  // ----------------------------------------
  {
    sectionNumber: "9.2",
    standardReference: "ISO 9001:2015 Clause 9.2.1",
    standardText: "The organization shall conduct internal audits at planned intervals to provide information on whether the quality management system: a) conforms to the organization's own requirements for its quality management system and the requirements of this International Standard; b) is effectively implemented and maintained.",
    auditQuestion: "Are internal audits conducted at planned intervals to verify QMS conformity to organizational requirements and ISO 9001, and effective implementation?",
    score1Criteria: "Internal audits are not conducted or are inadequate.",
    score2Criteria: "Audits are conducted but not at planned intervals or scope is incomplete.",
    score3Criteria: "Internal audits are conducted at planned intervals with comprehensive scope covering conformity and effectiveness."
  },
  {
    sectionNumber: "9.2",
    standardReference: "ISO 9001:2015 Clause 9.2.2",
    standardText: "The organization shall: a) plan, establish, implement and maintain an audit programme(s) including the frequency, methods, responsibilities, planning requirements and reporting, which shall take into consideration the importance of the processes concerned, changes affecting the organization, and the results of previous audits; b) define the audit criteria and scope for each audit; c) select auditors and conduct audits to ensure objectivity and the impartiality of the audit process; d) ensure that the results of the audits are reported to relevant management; e) take appropriate correction and corrective actions without undue delay; f) retain documented information as evidence of the implementation of the audit programme and the audit results.",
    auditQuestion: "Is an audit program established with defined criteria, objective auditors, reported results, timely actions, and documented information?",
    score1Criteria: "No audit program exists or key elements are missing.",
    score2Criteria: "Audit program exists but gaps in objectivity, reporting, or follow-up actions.",
    score3Criteria: "Comprehensive audit program with objective auditors, reported results, timely corrective actions, and documented information."
  },

  // ----------------------------------------
  // CLAUSE 9.3 - Management review
  // ----------------------------------------
  {
    sectionNumber: "9.3",
    standardReference: "ISO 9001:2015 Clause 9.3.1",
    standardText: "Top management shall review the organization's quality management system, at planned intervals, to ensure its continuing suitability, adequacy, effectiveness and alignment with the strategic direction of the organization.",
    auditQuestion: "Does top management review the QMS at planned intervals to ensure suitability, adequacy, effectiveness, and strategic alignment?",
    score1Criteria: "Management reviews are not conducted.",
    score2Criteria: "Reviews occur but not at planned intervals or strategic alignment is not considered.",
    score3Criteria: "Management reviews are conducted at planned intervals ensuring suitability, adequacy, effectiveness, and strategic alignment."
  },
  {
    sectionNumber: "9.3",
    standardReference: "ISO 9001:2015 Clause 9.3.2",
    standardText: "The management review shall be planned and carried out taking into consideration: a) the status of actions from previous management reviews; b) changes in external and internal issues that are relevant to the quality management system; c) information on the performance and effectiveness of the quality management system, including trends in customer satisfaction, objective achievement, process performance, nonconformities, monitoring results, audit results, and external provider performance; d) the adequacy of resources; e) the effectiveness of actions taken to address risks and opportunities; f) opportunities for improvement.",
    auditQuestion: "Does management review consider previous actions, context changes, QMS performance (customer satisfaction, objectives, processes, nonconformities, audits), resources, and risk actions?",
    score1Criteria: "Management review inputs are inadequate or incomplete.",
    score2Criteria: "Some inputs are considered but not all required elements are addressed.",
    score3Criteria: "All required management review inputs are comprehensively considered with documented evidence."
  },
  {
    sectionNumber: "9.3",
    standardReference: "ISO 9001:2015 Clause 9.3.3",
    standardText: "The outputs of the management review shall include decisions and actions related to: a) opportunities for improvement; b) any need for changes to the quality management system; c) resource needs. The organization shall retain documented information as evidence of the results of management reviews.",
    auditQuestion: "Do management review outputs include decisions on improvement opportunities, QMS changes, and resource needs with documented information retained?",
    score1Criteria: "Management review outputs are not documented or incomplete.",
    score2Criteria: "Some outputs exist but not all decisions are documented or actioned.",
    score3Criteria: "Management review outputs include all required decisions with documented information retained and actions tracked."
  },

  // ----------------------------------------
  // CLAUSE 10.1 - Improvement - General
  // ----------------------------------------
  {
    sectionNumber: "10.1",
    standardReference: "ISO 9001:2015 Clause 10.1",
    standardText: "The organization shall determine and select opportunities for improvement and implement any necessary actions to meet customer requirements and enhance customer satisfaction. These shall include: a) improving products and services to meet requirements as well as to address future needs and expectations; b) correcting, preventing or reducing undesired effects; c) improving the performance and effectiveness of the quality management system.",
    auditQuestion: "Does the organization determine, select, and implement improvement opportunities to enhance customer satisfaction and QMS performance?",
    score1Criteria: "Improvement is not systematically addressed.",
    score2Criteria: "Some improvement activities exist but are not systematic or comprehensive.",
    score3Criteria: "Improvement opportunities are systematically determined, selected, and implemented with documented results."
  },

  // ----------------------------------------
  // CLAUSE 10.2 - Nonconformity and corrective action
  // ----------------------------------------
  {
    sectionNumber: "10.2",
    standardReference: "ISO 9001:2015 Clause 10.2.1",
    standardText: "When a nonconformity occurs, including any arising from complaints, the organization shall: a) react to the nonconformity and, as applicable take action to control and correct it and deal with the consequences; b) evaluate the need for action to eliminate the cause(s) of the nonconformity, in order that it does not recur or occur elsewhere; c) implement any action needed; d) review the effectiveness of any corrective action taken; e) update risks and opportunities determined during planning, if necessary; f) make changes to the quality management system, if necessary.",
    auditQuestion: "When nonconformities occur, is there reaction, cause evaluation, action implementation, effectiveness review, and risk/QMS updates?",
    score1Criteria: "Nonconformity and corrective action process is inadequate or not followed.",
    score2Criteria: "Process exists but gaps in root cause analysis or effectiveness review.",
    score3Criteria: "Comprehensive nonconformity and corrective action process with documented root cause analysis, actions, and effectiveness review."
  },
  {
    sectionNumber: "10.2",
    standardReference: "ISO 9001:2015 Clause 10.2.2",
    standardText: "The organization shall retain documented information as evidence of: a) the nature of the nonconformities and any subsequent actions taken; b) the results of any corrective action.",
    auditQuestion: "Is documented information retained on nonconformity nature, actions taken, and corrective action results?",
    score1Criteria: "No documented information on nonconformities and corrective actions.",
    score2Criteria: "Some documentation exists but is incomplete or inconsistent.",
    score3Criteria: "Comprehensive documented information retained on all nonconformities, actions, and corrective action results."
  },

  // ----------------------------------------
  // CLAUSE 10.3 - Continual improvement
  // ----------------------------------------
  {
    sectionNumber: "10.3",
    standardReference: "ISO 9001:2015 Clause 10.3",
    standardText: "The organization shall continually improve the suitability, adequacy and effectiveness of the quality management system. The organization shall consider the results of analysis and evaluation, and the outputs from management review, to determine if there are needs or opportunities that shall be addressed as part of continual improvement.",
    auditQuestion: "Does the organization continually improve QMS suitability, adequacy, and effectiveness considering analysis results and management review outputs?",
    score1Criteria: "Continual improvement is not evident or systematic.",
    score2Criteria: "Some improvement occurs but not systematically linked to analysis and management review.",
    score3Criteria: "Systematic continual improvement with documented evidence linked to analysis results and management review outputs."
  }
];


// ============================================
// HELPER FUNCTION: Get section ID by number
// ============================================
export function getSectionNumberMap(sections: typeof standardSections) {
  return sections.reduce((map, section, index) => {
    map[section.sectionNumber] = index + 1; // Assuming IDs start at 1
    return map;
  }, {} as Record<string, number>);
}
