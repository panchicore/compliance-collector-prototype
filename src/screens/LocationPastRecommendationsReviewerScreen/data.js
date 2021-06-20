export const RECOMMENDATION_STATUS = [
  {
    id: 1,
    name: "Pending Validation",
    color_primary: "#843fff",
    color_secondary: "#e0d5ff",
    category: null,
    get_category_display: null
  },
  {
    id: 4,
    name: "In Progress",
    color_primary: "#FF9B44",
    color_secondary: "#FFEFD8",
    category: "in-progress",
    get_category_display: "In Progress"
  },
  {
    id: 5,
    name: "No Longer Applicable",
    color_primary: "#28963A",
    color_secondary: "#EDFFD8",
    category: "no-action-needed",
    get_category_display: "Completed"
  },
  {
    id: 6,
    name: "Action Needed",
    color_primary: "#FF2E2E",
    color_secondary: "#FFD8D8",
    category: "urgent-action-needed",
    get_category_display: "Action Needed"
  },
  {
    id: 7,
    name: "Completed",
    color_primary: "#28963A",
    color_secondary: "#EDFFD8",
    category: "no-action-needed",
    get_category_display: "Completed"
  },
  {
    id: 2,
    name: "Invalidated",
    color_primary: "#A0A0A0",
    color_secondary: "#E0E0E0",
    category: null,
    get_category_display: null
  }
];

const COMPLETED = 4;
const ACTION_NEEDED = 3;
const IN_PROGRESS = 1;

export const LOCATION_RECOMMENDATIONS = [
  {
    id: 1,
    isImplemented: {
      answer: null,
      justification: ""
    },
    component: "SRMM: ROLES AND RESPONSIBILITIES",
    body:
      "Recommendation to merge radio room into safe room area; if not feasible duplicate emergency comms advised inside safe room; including VHF and external aerial supported SAT phone. This is a recommendation with full activity log",
    assignees: ["fso.user@wfp.org", "sfp.user@wfp.org"],
    status: RECOMMENDATION_STATUS[COMPLETED],
    activity: [
      {
        date: "MARCH 12, 2020",
        action: "FLORIAN BAALCKE CHANGED STATUS",
        message:
          "Recommendation was accepted by the RSO, status changed to be in progress",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "TREMP BOT SET AS DUE",
        message:
          "Six months happened since the last follow up, changed status from In Progress to Overdue",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "LUCIANO NOLASCO PROPOSED STATUS",
        message:
          "The assignee proposed to be Completed with message: In the new Office , they were merged..",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "FLORIAN BAALCKE ACCEPTED THE PROPOSED STATUS",
        message: "Changed status from Action Needed to Completed",
        hasFile: false
      }
    ]
  },
  {
    id: 2,
    isImplemented: {
      answer: null,
      justification: ""
    },
    component: "SRMM: ROLES AND RESPONSIBILITIES",
    body:
      "A fire alarm system and smoke detectors must be installed in the UNHCR building. This is a recommendation with full activity log",
    assignees: ["fso.user@wfp.org", "sfp.user@wfp.org"],
    status: RECOMMENDATION_STATUS[IN_PROGRESS],
    activity: [
      {
        date: "MARCH 12, 2020",
        action: "SOSICENI SENIBULU CHANGED STATUS",
        message:
          "Recommendation was accepted by the RSO, status changed to be in progress",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "TREMP BOT SET AS DUE",
        message:
          "Six months happened since the last follow up, changed status from In Progress to Overdue",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "RODRIGUES MASSINGUE PROPOSED STATUS",
        message:
          "The assignee proposed to be In Progress with message: Fire alarm system and smoke detectors being installed.",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "SOSICENI SENIBULU ACCEPTED THE PROPOSED STATUS",
        message: "Changed status from Action Needed to In Progress",
        hasFile: false
      }
    ]
  },
  {
    id: 3,
    isImplemented: {
      answer: null,
      justification: ""
    },
    component: "SRMM: ROLES AND RESPONSIBILITIES",
    body:
      "Cargo net is recommended to be fitted to WFP vehicle boot to secure loose items in a potential traffic accident Fire/Smoke detectors are urgently still required throughout the entire office. This is a recommendation with full activity log",
    assignees: ["fso.user@wfp.org", "sfp.user@wfp.org"],
    status: RECOMMENDATION_STATUS[COMPLETED],
    activity: [
      {
        date: "MARCH 12, 2020",
        action: "NICOLAS MORIN CHANGED STATUS",
        message:
          "Recommendation was accepted by the RSO, status changed to be in progress",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "WALID IBRAHIM PROPOSED STATUS",
        message:
          "The assignee proposed to be Completed with message: With the heightening of the security situation in the area the CO has requested staff to work from Buthidang where a prefabricated office was installed in the warehouse. Therefore, the number of staff required to use the daily shuttle diminished thus allowing the remaining staff requiring shuttle services to be shuttled in a closed vehicle. In addition the CO is in the process of replacing vehicles across the country and Mungdaw has been assigned a long body vehicle which will be able to cater for all staff shuttle needs in the future.",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "NICOLAS MORIN ACCEPTED THE PROPOSED STATUS",
        message: "Changed status from Action Needed to Completed",
        hasFile: false
      }
    ]
  },
  {
    id: 4,
    isImplemented: {
      answer: null,
      justification: ""
    },
    component: "SRMM: ROLES AND RESPONSIBILITIES",
    body:
      "New ASC should be appointed. This is a recommendation with full activity log",
    assignees: ["fso.user@wfp.org", "sfp.user@wfp.org"],
    status: RECOMMENDATION_STATUS[COMPLETED],
    activity: [
      {
        date: "MARCH 12, 2020",
        action: "FLORIAN BAALCKE LEFT A MESSAGE",
        message:
          "These recommendation refers to actions to be taken by UNSMS officials outside WFP. So their completion lies outside WFP's direct influence. RSO recommends to take action to prompt the action by the respective UN official. Once these actions are taken the recommendation will be considered done.",
        hasFile: false
      },
      {
        date: "MARCH 12, 2020",
        action: "THOMAS, NICOLAS BOUFFARD PROPOSED STATUS",
        message:
          "The assignee proposed to be Completed with message: Appointment letter have been share and ASC UNHCR have to start ASMT. [nomination_coordonnateurs_regionaux_de_securite.pdf]",
        hasFile: "nomination_coordonnateurs_regionaux_de_securite.pdf"
      },
      {
        date: "MARCH 12, 2020",
        action: "FLORIAN BAALCKE ACCEPTED THE PROPOSED STATUS",
        message: "Changed status from In Progress to Completed",
        hasFile: false
      }
    ]
  }
];
