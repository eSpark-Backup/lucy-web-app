import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Account from "./Account";
import { ACCOUNT_FOR_SCHOOL, ACCOUNT_FOR_TRUST } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import {
  accountForSchoolSchema,
  accountForTrustSchema,
} from "../../schemas/signup";

const Signup = () => {
  const { role } = useParams();
  return (
    <Box>
      {role === "user" && (
        <Account
          role="User"
          data={ACCOUNT_FOR_SCHOOL}
          styles={componentStyles}
          schema={accountForSchoolSchema}
        />
      )}
      {role === "trust" && (
        <Account
          role="Trust"
          data={ACCOUNT_FOR_TRUST}
          styles={componentStyles}
          schema={accountForTrustSchema}
        />
      )}
    </Box>
  );
};

export default Signup;
