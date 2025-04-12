import { Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";

export default function DeleteAccount({user}) {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
          deleteUser(user._id);
        }
      };
  return (
    <div>
      <Stack spacing={6}>
        <Heading size="md">Privacy Settings</Heading>
        <Button onClick={handleDelete} colorScheme="red" w="fit-content">
          Delete Account
        </Button>
      </Stack>
    </div>
  );
}
