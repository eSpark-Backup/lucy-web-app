import {
  certified,
  grad,
  magic,
  pages,
  review1,
  review2,
  review3,
  review4,
  review5,
  review6,
  review7,
  review8,
  review9,
  service1,
  service2,
  service3,
  service4,
  service5,
  service6,
} from "../assets";
import dashboard from "../assets/images/sidebar/dashboard.png";
import calendar from "../assets/images/sidebar/calendar.png";
import terms from "../assets/images/sidebar/terms.png";
import book from "../assets/images/sidebar/book.png";
import about from "../assets/images/sidebar/about.png";
import profile from "../assets/images/sidebar/profile.png";
import logout from "../assets/images/sidebar/logout.png";
import { loadStripe } from "@stripe/stripe-js";

export const features = [
  {
    heading: "Fill Every Seat",
    description:
      "More students mean more funding, ensuring more resources and improved education.",
    img: grad,
  },
  {
    heading: "Lead Over Other Schools",
    description:
      "Parents choose schools that showcase their successes. Make sure yours stands out.",
    img: certified,
  },
  {
    heading: "Boost Your Reputation",
    description:
      "Easily highlight Ofsted ratings, academic success, and extracurricular victories.",
    img: magic,
  },
  {
    heading: "Engage Your Community",
    description:
      "Strengthen ties with parents, local media, and potential future students alike.",
    img: pages,
  },
];

export const slides = [
  {
    heading: "Edupulsegpt creates your press releases",
    description:
      "Edupulsegpt crafts compelling press releases to showcase your school’s achievements, events, and milestones to the wider community.",
    image: service1,
  },
  {
    heading: "Edupulsegpt creates your Facebook posts",
    description:
      "Edupulsegpt designs engaging Facebook posts that highlight your school’s success, news, and events—keeping your community informed.",
    image: service2,
  },
  {
    heading: "Edupulsegpt creates your Instagram posts",
    description:
      "Edupulsegpt delivers eye-catching Instagram posts to showcase your school’s spirit, achievements, and daily moments with your audience.",
    image: service3,
  },
  {
    heading: "Edupulsegpt creates your newsletter content",
    description:
      "Edupulsegpt curates impactful newsletter content to keep parents, staff, and the wider community informed, engaged, and connected.",
    image: service4,
  },
  {
    heading: "Edupulsegpt writes your Trust & governor report summaries",
    description:
      "Edupulsegpt crafts clear, concise summaries for Trust and governor reports, making key insights easy to share with stakeholders.",
    image: service5,
  },
  {
    heading: "Edupulsegpt creates your press releases",
    description:
      "Edupulsegpt crafts compelling press releases to showcase your school’s achievements, events, and milestones to the wider community.",
    image: service6,
  },
  {
    heading: "Edupulsegpt creates your Facebook posts",
    description:
      "Edupulsegpt designs engaging Facebook posts that highlight your school’s success, news, and events—keeping your community informed.",
    image: service1,
  },
  {
    heading: "Edupulsegpt creates your Instagram posts",
    description:
      "Edupulsegpt delivers eye-catching Instagram posts to showcase your school’s spirit, achievements, and daily moments with your audience.",
    image: service3,
  },
  {
    heading: "Edupulsegpt creates your newsletter content",
    description:
      "Edupulsegpt curates impactful newsletter content to keep parents, staff, and the wider community informed, engaged, and connected.",
    image: service4,
  },
  {
    heading: "Edupulsegpt writes your Trust & governor report summaries",
    description:
      "Edupulsegpt crafts clear, concise summaries for Trust and governor reports, making key insights easy to share with stakeholders.",
    image: service5,
  },
];

export const reviewCardsContent = [
  {
    profile: review1,
    name: "Marc Köhlbrugge",
    userName: "@marckohlbrugge",
    content: `<p>Tweeting more with <span style={{color:"#199AF5"}}>@typefully</span> these days.</p> 
     <p>🙈 Distraction-free</p>
   <p>✍️ Write-only Twitter</p>
   <p>🧵 Effortless threads</p>
   <p>📈 Actionable metrics</p> <p style="margin-top: 12px;">I recommend giving it a shot.</p>`,
  },
  {
    profile: review2,
    name: "Santiago",
    userName: "@svpino",
    content: ` <p>
    For 24 months, I tried almost a dozen Twitter scheduling tools.
  </p>

  <p>
    Then I found <span style="color: #199AF5;">@typefully</span>, and I've been using it for seven months straight.
  </p>

  <p>
    When it comes down to the experience of scheduling and long-form content writing, Typefully is in a league of its own.
  </p>`,
  },
  {
    profile: review3,
    name: "Easlo",
    userName: "@heyeaslo",
    content: `<p>I recommend <span style="color: #199AF5;">@typefully</span>, I use it to write all my
tweets and threads, include posting schedule
and analytics.</p>`,
  },
  {
    profile: review6,
    name: "Naitik Mehta",
    userName: "@heyNaitik",
    content: `<p>I've reached 600K+ impressions since I started writing online 6 months ago w/ <span style="color: #199AF5;">@typefully</span> 🤯</p> 
    <p>Shoutout to the team for building a beautiful writing tool with thought, care, and good design.</p>
    <p>👉 Clean UX/design</p>
    <p>👉 Mobile-friendly</p>
    <p>👉 Keyboard shortcuts</p>
    <p>👉 Rarely see any bugs</p>
    `,
  },

  {
    profile: review4,
    name: "Jurre Houtkamp",
    userName: "@jurrehoutkamp",
    content: `<p>Typefully is fantastic and way too cheap for what you get.</p> 
     <p>We’ve tried many alternatives at <span style="color: #199AF5;">@framer</span> but nothing beats it. If you’re still tweeting from Twitter you’re wasting time.</p>`,
  },

  {
    profile: review5,
    name: "Luca Rossi",
    userName: "@lucaronin",
    content: `<p>After trying literally all the major Twitter scheduling tools, I settled with <span style="color: #199AF5;">@typefully</span></p> 
     <p>Killer feature to me is the native image editor — unique and super useful 🙏</p>`,
  },
  {
    profile: review9,
    name: "daws.eth",
    userName: "@DawsonBotsford",
    content: `<p>Impressed with <span style="color: #199AF5;">@typefully.</span> It's the editor you wish Twitter had.</p> 
    <p>Saving multiple drafts, re-ordering tweets in a thread, and moving attached images around is EASY.</p>
    `,
  },

  {
    profile: review8,
    name: "Visual Theory",
    userName: "@visualtheory_",
    content: `<p>Really impressed by the way <span style="color: #199AF5;">@typefully</span> has simplified my Twitter writing + scheduling/publishing experience.</p> 
    <p>Beautiful user experience.</p>
    <p>0 friction.</p>
    <p>Simplicity is the ultimate sophistication.</p>
    `,
  },
  {
    profile: review7,
    name: "DHH",
    userName: "@dhh",
    content: `<p>This is my new go-to writing environment for Twitter threads.</p> 
    <p>They've built something wonderfully simple and distraction free with Typefully 😍</p>
    `,
  },
];

// export const q1Options = [
//   { label: "Dedicated marketing staff", value: "Dedicated marketing staff" },
//   { label: "Admin/teachers handle it", value: "Admin/teachers handle it" },
//   { label: "We outsource to an agency", value: "We outsource to an agency" },
//   {
//     label: "We don’t do much marketing right now",
//     value: "We don’t do much marketing right now",
//   },
// ];

export const q2Options = [
  { label: "Primary", value: "Primary" },
  { label: "Secondary", value: "Secondary" },
  { label: "Special Education", value: "Special Education" },
  { label: "Independent", value: "Independent" },
  { label: "Academy Trust", value: "Academy Trust" },
  { label: "Other (please specify)", value: "Other (please specify)" },
];

// export const q3Options = [
//   {
//     label: "Keeping up with regular content creation",
//     value: "Keeping up with regular content creation",
//   },
//   {
//     label: "Attracting more students/admissions",
//     value: "Attracting more students/admissions",
//   },
//   {
//     label: "Engaging parents & the community",
//     value: "Engaging parents & the community",
//   },
//   {
//     label: "Promoting school achievements",
//     value: "Promoting school achievements",
//   },
//   {
//     label: "Managing social media effectively",
//     value: "Managing social media effectively",
//   },
//   {
//     label: "Lack of time/resources",
//     value: "Lack of time/resources",
//   },
//   {
//     label: "Other (please specify)",
//     value: "Other (please specify)",
//   },
// ];

// export const q4Options = [
//   {
//     label: "Automated social media content",
//     value: "Automated social media content",
//   },
//   {
//     label: "Press release & newsletter generation",
//     value: "Press release & newsletter generation",
//   },
//   {
//     label: "Calendar-based marketing planning",
//     value: "Calendar-based marketing planning",
//   },
//   {
//     label: "Trust/governor report summaries",
//     value: "Trust/governor report summaries",
//   },
//   {
//     label: "Saving time on school marketing",
//     value: "Saving time on school marketing",
//   },
//   {
//     label: "Other (please specify)",
//     value: "Other (please specify)",
//   },
// ];

// export const q5Options = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
//   { label: "Unsure", value: "Unsure" },
// ];

export const q6Options = [
  { label: "Dedicated marketing staff", value: "Dedicated marketing staff" },
  { label: "Admin/teachers handle it", value: "Admin/teachers handle it" },
  { label: "We outsource to an agency", value: "We outsource to an agency" },
  {
    label: "We don’t do much marketing right now",
    value: "We don’t do much marketing right now",
  },
];

export const q7Options = [
  { label: "Facebook", value: "Facebook" },
  { label: "Instagram", value: "Instagram" },
  { label: "School website/blog", value: "School website/blog" },
  { label: "Newsletters", value: "Newsletters" },
  { label: "Local media/press", value: "Local media/press" },
  { label: "Other (please specify)", value: "Other (please specify)" },
];

export const q8Options = [
  {
    label: "Keeping up with regular content creation",
    value: "Keeping up with regular content creation",
  },
  {
    label: "Attracting more students/admissions",
    value: "Attracting more students/admissions",
  },
  {
    label: "Engaging parents & the community",
    value: "Engaging parents & the community",
  },
  {
    label: "Promoting school achievements",
    value: "Promoting school achievements",
  },
  { label: "Lack of time/resources", value: "Lack of time/resources" },
  { label: "Other (please specify)", value: "Other (please specify)" },
];

export const q9Options = [
  {
    label: "Automated social media content",
    value: "Automated social media content",
  },
  {
    label: "Press release & newsletter generation",
    value: "Press release & newsletter generation",
  },
  {
    label: "Calendar-based marketing planning",
    value: "Calendar-based marketing planning",
  },
  {
    label: "Trust/governor report summaries",
    value: "Trust/governor report summaries",
  },
  {
    label: "Saving time on school marketing",
    value: "Saving time on school marketing",
  },
  { label: "Other (please specify)", value: "Other (please specify)" },
];

export const q10Options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Unsure", value: "unsure" },
];

export const q11Options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const q12Options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const ROUTES = {
  // Public
  login: "login",
  signup: "signup",
  forgotPassword: "forgot",

  // Private
  dashboard: "dashboard",
  calendar: "calendar",
  about: "about",
};

export const LOGIN = {
  title: "Login to Account",
  description: "Please enter your email and password to continue",
  fields: [
    {
      label: "Email address:",
      type: "email",
      placeholder: "example@gmail.com",
      key: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "••••••",
      key: "password",
    },
  ],
  checkboxText: "Remember Password",
  forgot: {
    text: "Forget Password?",
    link: "/auth/forget",
  },
  buttonText: "Sign in",
  haveAnAccountText: "Don’t have an account?",
  signUpText: {
    text: "Create Account",
    link: "/sub-plan",
  },
};

export const SIGNIN = {
  title: "Create an Account",
  description: "Create a account to continue",
  fields: [
    {
      isRow: true,
      fields: [
        {
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
          key: "first_name",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
          key: "last_name",
        },
      ],
    },
    {
      label: "Email address:",
      type: "email",
      placeholder: "example@gmail.com",
      key: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "••••••",
      key: "password",
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "••••••",
      key: "confirm_password",
    },
  ],
  checkboxText: "Remember Password",
  forgot: {
    text: "Forget Password?",
    link: "/auth/forget",
  },
  buttonText: "Sign Up",
  haveAnAccountText: "Already have an account?",
  signUpText: {
    text: "Login",
    link: "/auth/login",
  },
};

export const FORGET = {
  title: "Forget Password",
  description: "Please enter your email and receive a password",
  fields: {
    label: "Email address:",
    type: "email",
    placeholder: "example@gmail.com",
    key: "email",
  },
  buttonText: "Continue",
  haveAnAccountText: "Don’t have an account?",
  signUpText: {
    text: "Create Account",
    link: "/sub-plan",
  },
};

export const RESETPASSWORD = {
  title: "Reset Password",
  description: "Please enter current password and a new password to continue.",
  fields: [
    {
      label: "New password",
      type: "password",
      placeholder: "••••••",
      key: "new_password",
    },
    {
      label: "Confirm password",
      type: "password",
      placeholder: "••••••",
      key: "confirm_password",
    },
  ],
  buttonText: "Continue",
  haveAnAccountText: "Don’t have an account?",
  signUpText: {
    text: "Create Account",
    link: "/auth/signup",
  },
};

export const VERIFY_EMAIL = {
  title: "Verify Email",
  description: "Verification email is sent to your inbox please verify it",
  buttonText: "Resend",
  backToLogin: " back to login",
  loginLink: "/auth/login",
};

export const EMAIL_VERIFICATION = {
  title: "Email Verification",
  description: "Please wait until your email is verified",
  successMessage: "Your email is verified",
  failureMessage: "Your email is not verified",
  buttonText: "Continue",
};

export const GOTLOST = {
  title: "Looks like you’ve got lost….",
  buttonText: "Back to Dashboard",
};

export const ACCOUNT_FOR_SCHOOL = {
  title: "Create an Account For School",
  description: "Create a account to continue",
  fields: [
    {
      isRow: true,
      fields: [
        {
          label: "First Name",
          type: "text",
          placeholder: "Enter first name",
          key: "first_name",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
          key: "last_name",
        },
      ],
    },
    {
      label: "Email address:",
      type: "email",
      placeholder: "example@gmail.com",
      key: "email",
    },
    {
      isRow: true,
      fields: [
        {
          label: "Phone Number",
          type: "text",
          placeholder: "Phone number",
          key: "phone",
        },
        {
          label: "Location",
          type: "text",
          placeholder: "Location",
          key: "address",
        },
      ],
    },
    {
      label: "Password",
      type: "password",
      placeholder: "••••••",
      key: "password",
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "••••••",
      key: "confirm_password",
    },
  ],
  checkboxText: "I accept terms and conditions",
  buttonText: "Sign Up",
  haveAnAccountText: "Already have an account?",
  signUpText: {
    text: "Login",
    link: "/auth/login",
  },
};

export const ACCOUNT_FOR_TRUST = {
  title: "Create an Account For Trust",
  description: "Create a account to continue",
  fields: [
    {
      isRow: true,
      fields: [
        {
          label: "First Name",
          type: "text",
          placeholder: "Enter first name",
          key: "first_name",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
          key: "last_name",
        },
      ],
    },
    {
      label: "Trust Name",
      type: "text",
      placeholder: "Trust name",
      key: "name",
    },
    {
      label: "Email address:",
      type: "email",
      placeholder: "example@gmail.com",
      key: "email",
    },
    {
      isRow: true,
      fields: [
        {
          label: "Phone Number",
          type: "text",
          placeholder: "Phone number",
          key: "phone",
        },
        {
          label: "Location",
          type: "text",
          placeholder: "Location",
          key: "address",
        },
      ],
    },
    {
      label: "Password",
      type: "password",
      placeholder: "••••••",
      key: "password",
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "••••••",
      key: "confirm_password",
    },
    {
      label: "Add a school",
      type: "number",
      placeholder: "Add a school",
      key: "selected_school_count",
    },
  ],
  checkboxText: "I accept terms and conditions",
  buttonText: "Sign Up",
  haveAnAccountText: "Already have an account?",
  signUpText: {
    text: "Login",
    link: "/auth/login",
  },
};

export const SIDEBAR = {
  sidebarLink: [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: dashboard,
    },
    {
      text: "Calendar",
      link: "/dashboard/calendar",
      icon: calendar,
    },
    {
      text: "About",
      link: "/dashboard/about",
      icon: about,
    },
    {
      text: "Schools",
      link: "/dashboard/school-overview",
      icon: book,
    },
    {
      text: "Terms",
      link: "/dashboard/terms",
      icon: terms,
    },
  ],
  profileLink: {
    text: "Profile",
    link: "/dashboard/profile",
    icon: profile,
  },
  LogoutButton: {
    text: "Logout",
    icon: logout,
  },
};

export const EVENTFORM = {
  fields: (date, is_trust, isSchoolRole) => {
    const trustFields = [
      {
        label: "School Name",
        placeholder: "Enter your School Name",
        type: "select",
        name: "school_email",
        size: { xs: 12 },
        is_editable: false,
        disabled: !is_trust ? true : false,
      },
      {
        label: "School Email",
        placeholder: "Enter your School Email",
        type: "email",
        name: "show_email",
        disabled: true,
        size: { xs: 12 },
        is_editable: false,
      },
    ];

    const dateField = {
      label: "Select Date",
      placeholder: "Enter your Event Date",
      type: "date",
      name: "date",
      size: 12,
      is_editable: true,
    };

    return [
      ...(!isSchoolRole ? trustFields : []),
      {
        label: "Event Name",
        placeholder: "Enter your Event Name",
        type: "text",
        name: "event_name",
        size: { xs: 12, lg: 5.5 },
        is_editable: true,
      },
      {
        label: "Event Type",
        placeholder: "Enter your Event Type",
        type: "text",
        name: "event_type",
        size: { xs: 12, lg: 5.5 },
        is_editable: true,
      },
      ...(!date ? [dateField] : []),
      {
        label: "Upload Image/Avatar",
        btnText: "Upload Image",
        name: "image",
        size: 12,
        is_editable: true,
      },
      {
        label: "Description",
        placeholder: "Provide a short description",
        type: "text",
        name: "description",
        size: 12,
        is_editable: true,
      },
    ];
  },
};

export const SCHOOL_INFORMATION_FORM = {
  fields: (is_trust = false, isEdit = false, isPreview = false) => {
    const fields = [
      {
        label: "School name",
        placeholder: "Enter your school  name ",
        type: "text",
        name: "name",
        size: { xs: 12, lg: 5.5 },
      },
      {
        label: "Location",
        placeholder: "Enter your location",
        type: "text",
        name: "address",
        size: { xs: 12, lg: 5.5 },
      },
      {
        label: "Phone Number",
        placeholder: "Enter your phone number",
        type: "text",
        name: "phone",
        size: { xs: 12, lg: 5.5 },
      },
      {
        label: "E-mail address",
        placeholder: "school@gmail.com",
        type: "email",
        name: "email",
        size: { xs: 12, lg: 5.5 },
        disabled: isEdit ? true : false,
      },
      {
        label: "Upload Image/Avtar",
        btnText: "Upload Image",
        name: "image",
        size: 12,
      },
      {
        label: "Description",
        placeholder: "Provide some small Description",
        type: "text",
        name: "description",
        size: 12,
      },
    ];
    if (is_trust && !isEdit && !isPreview) {
      fields.splice(
        4,
        0,
        {
          label: "Password",
          placeholder: "Enter password",
          type: "password",
          name: "password",
          size: { xs: 12, lg: 5.5 },
        },
        {
          label: "Confirm Password",
          placeholder: "Re-enter password",
          type: "password",
          name: "confirm_password",
          size: { xs: 12, lg: 5.5 },
        }
      );
    }

    return fields;
  },
};

export const CONTENTFORM = {
  radioButtonsLable: "Content Type",
  contentTypeOptions: [
    {
      label: "Press Release",
      name: "press_release",
      placeholder: "press release",
    },
    {
      label: "Instagram Post",
      name: "instagram_post",
      placeholder: "instagram post",
    },
    {
      label: "Facebook Post",
      name: "facebook_post",
      placeholder: "facebook post",
    },
    {
      label: "Newsletter Inclusion",
      name: "newsletter",
      placeholder: "newsletter inclusion",
    },
    {
      label: "Governor Report Summary",
      name: "governor_summary",
      placeholder: "governor report summary",
    },
  ],
  // radioButtons: [
  //   "Press Release",
  //   "Instagram Post",
  //   "Facebook Post",
  //   "Newsletter Inclusion",
  //   "Governor Summary",
  // ],
  aiButtonText: "Enhance with AI",
  uploadButtonText: "Upload Image",
  buttonText: "Add",
  methodText: "Post Method",
  methodRadioButton: "Email",
  fields: [
    {
      label: "Description",
      placeholder:
        "Write a 3 paragraph  600 Words press release on (Event Name)",
      type: "text",
      name: "description",
      size: 12,
    },
    {
      label: "Recipients",
      placeholder: "Add recipients mail here",
      type: "text",
      name: "recipients",
      size: 12,
    },
  ],
};

export const plans = [
  {
    title: "Basic",
    description: "Multi Academy Trust Plan",
    price: "$10",
    details:
      "Every school within the trust gets one login. This discounted rate is available only if all schools in the trust sign up.",
  },
  {
    title: "Basic",
    description: "Single School Plan",
    price: "$50",
    details:
      "One login that can be used only within a single school. Ideal for independent schools or schools not part of a trust-wide subscription.",
  },
];

export const DASHBOARD_DATA = {
  text: "Welcome To",
};

export const CALENDAR_DATA = {
  CREATEDEVENTS_DATA: {
    addEventButtonText: "+ Add New Event",
    createEventText: "Created Events",
    eventsLink: "/dashboard/calendar/events/",
    noEventsText: "No Events Available",
  },
};

export const PROFILE_DATA = {
  text: "Edit Photo",
  fields: (isEditing) => [
    { label: "First Name", name: "firstName", disabled: !isEditing },
    { label: "Last Name", name: "lastName", disabled: !isEditing },
    { label: "Your Email", name: "email", disabled: true },
    { label: "Phone Number", name: "phone", disabled: !isEditing },
  ],
};

export const SUBSCRIPTION_PLAN_DATA = {
  heading: "Choose Your Subscription Plan",
  subPrice: "Per School/Months",
  button: "Subscribe Now",
};

export const GLOBAL_SUBSCRIPTION_PLAN_DATA = {
  title: "Choose your plans",
  description:
    "Sign-up in less then 30 seconds. Try out 7days free trials Upgrade at anytime, no question, no hustle",
  skipText: "Skip",
  monthText: "Monthly",
  yearText: "Yearly",
  cards: [
    {
      title: "Basic",
      subtitle: "Single School Plan",
      price: "£50",
      per: "Per School/Months",
      description:
        "One login that can be used only within a single school. Ideal for independent schools or schools not part of a trust-wide subscription.",
      buttonText: "Choose plan",
      buttonLink: "/auth/signup/user",
    },
    {
      title: "Basic",
      subtitle: "Multi Academy Trust Plan",
      price: "£10",
      per: "Per School/Months",
      description:
        "Every school within the trust gets one login. This discounted rate is available only if all schools in the trust sign up.",
      buttonText: "Choose plan",
      buttonLink: "/auth/signup/trust",
    },
  ],
};

export const SCHOOL_FORM_SUBMISSION_TITLES = {
  edit: "Edit School Information",
  preview: "School Information",
  add: "Add School",
};

export const PAYMENT_METHOD_DATA = {
  paymentSection: {
    yearBillingText: "Save with yearly billing",
    paymentText: "Payment Method",
    paymentDescription: "Select your preferred payment method for ShopSwift",
    paymentOptions: [
      {
        title: "Credit or debit card",
        value: "card",
        form: [
          {
            label: "Card holder name",
            placeholder: "Card holder name",
            name: "holder_name",
            type: "text",
          },
          {
            isRow: true,
            fields: [
              {
                label: "Card number",
                placeholder: "xxxx-xxxx-xxxxx",
                name: "card_number",
                type: "text",
              },
              {
                label: "Expires",
                placeholder: "mm/yy",
                name: "expires",
                type: "month",
              },
              { label: "CVV", placeholder: "xxx", name: "cvv", type: "number" },
            ],
          },
          {
            isRow: true,
            fields: [
              {
                label: "Country/region",
                placeholder: "Indonesia",
                name: "country",
                type: "text",
              },
              {
                label: "ZIP Code",
                placeholder: "Input ZIP Code",
                name: "zip_code",
                type: "text",
              },
            ],
          },
        ],
      },
      // {
      //   title: "Paypal",
      //   value: "paypal",
      //   form: [
      //     {
      //       label: "Email",
      //       placeholder: "Input email",
      //       name: "email",
      //       type: "email",
      //     },
      //     {
      //       label: "Password",
      //       placeholder: "Input password",
      //       name: "password",
      //       type: "password",
      //     },
      //   ],
      // },
    ],
  },
  planSection: {
    planSummary: {
      title: "Advanced plan",
      price: "$299.00",
      billingCycle: "Monthly",
      offer: "$1 x 2 months",
    },
    stepperData: [
      {
        date: "Today",
        title: "Trial",
        price: "Free",
      },
      {
        date: "March 1, 2024",
        title: "$1 x 2 months",
        price: "$1.00",
        period: "Every 30 days",
      },
      {
        date: "May 1, 2024",
        title: "Advanced plan",
        price: "$299.00",
        period: "Every 30 days",
      },
    ],
    amountSummary: {
      title: "Amount due",
      date: "March 1, 2024",
      text: "Plus applicable taxes",
      buttonText: "Subscribe",
      buttonLink: "#",
      subText: "Change or cancel your plan at any time",
    },
  },
};

export const ABOUT_DATA = {
  title: "About Edupulsegpt",
  highlightText:
    "Every empty seat in a school represents lost money and funding",
  description: `Edupulsegpt acts as your school's dedicated marketing department, offering
          a game-changing, inexpensive AI-based marketing app. With subscriptions
          costing as little as £10 per month ( subject to full trust sign-up ), it
          provides a vital solution for busy, cash-strapped schools to enhance
          their visibility within the community. In an age where parents have more
          choices than ever, actively promoting your school is essential to avoid
          missing out. Edupulsegpt was created to solve the challenge of busy school
          staff and stretched finances by providing an AI-driven marketing tool to
          help schools thrive.`,
  services: [
    {
      icon: "Campaign",
      color: "#1976d2",
      title: "Press Releases",
      desc: "Crafts compelling press releases to showcase your school’s achievements, events, and milestones to the wider community.",
    },
    {
      icon: "Facebook",
      color: "#1877f2",
      title: "Facebook Posts",
      desc: "Engaging posts that highlight your school's success, news, and events to keep your community informed.",
    },
    {
      icon: "Instagram",
      color: "#e1306c",
      title: "Instagram Content",
      desc: "Eye-catching posts to showcase your school spirit and daily moments with your audience.",
    },
    {
      icon: "Mail",
      color: "#D93025",
      title: "Newsletters & Reports",
      desc: "Creates impactful newsletters for parents, staff, and governors—keeping everyone connected and informed.",
    },
  ],
  founderText: "About the Founder",
};

export const stripePromise = loadStripe(
  "pk_test_51S0I0jF6ux8ejGM2zH6FYbjegxCyrxk2ymwvifb2BdTDO1sWtXC47i6eQ2EZJFO9c9z6Gyu5w9R5gbTDcxSgg6Ch006MSAkTeo"
);

export const CONTACT_DATA_FOR_TERMS = {
  text: "Contact Information",
  content:
    "If you have any questions regarding these Terms and Conditions, please contact:",
  heading: "Edupulsegpt Support Team",
  info: {
    email: "support@edupulse.co.uk",
    website: "https://app.edupulse.co.uk",
  },
};
