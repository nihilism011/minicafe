// Styles
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    iconfont: "fa" || "md",
  },
  // theme: {
  //   themes: {
  //     light: {
  //       colors: {
  //         primary: "#FF7043",
  //         secondary: "#424242",
  //         accent: "#FFAB91",
  //         error: "#FF5252",
  //         info: "#2196F3",
  //         success: "#4CAF50",
  //         warning: "#FFC107",
  //       },
  //     },
  //   },
  // },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
