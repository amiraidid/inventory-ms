import { Button, Heading, Input, Stack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { InventoryContext } from "../context/InventoryContext";

export default function ChangePassword({user}) {
    const { passwordChange } = useContext(InventoryContext);
    const [inputs, setInputs] = useState({  currentPassword: "", newPassword: "" });

    const handlePasswordChange = () => {
      passwordChange(user._id, inputs);
      setInputs({ currentPassword: "", newPassword: "" });
      sessionStorage.removeItem("token");
      window.location.reload();
    };

  return (
    <div>
      <Stack spacing={4}>
        <Heading size="md">Account Settings</Heading>
        <Input
          placeholder="Current Password"
          type="password"
          value={inputs.currentPassword}
          onChange={(e) =>
            setInputs({ ...inputs, currentPassword: e.target.value })
          }
        />
        <Input
          placeholder="New Password"
          type="password"
          value={inputs.newPassword}
          onChange={(e) =>
            setInputs({ ...inputs, newPassword: e.target.value })
          }
        />
        <Button
          onClick={handlePasswordChange}
          colorScheme="blue"
          w="fit-content"
        >
          Update Password
        </Button>
      </Stack>
    </div>
  );
}
