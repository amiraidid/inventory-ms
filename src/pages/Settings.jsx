import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
  Switch,
  Flex,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { jwtDecode } from "jwt-decode";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";

function Settings() {
  const { users, updateUser, passwordChange, deleteUser } =
    useContext(InventoryContext);
  const toast = useToast();
  const token = sessionStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;

  const currentUser = users?.find((user) => user._id === decoded?.id);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (currentUser) {
      setInputs({
        name: currentUser.name,
        email: currentUser.email,
        username: currentUser.username,
      });
    }
  }, [currentUser]);

  const handleProfileUpdate = () => {
    if (!currentUser) return;
    updateUser(currentUser._id, inputs);
    toast({
      title: "Profile updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="4xl" mx="auto" p={6}>
      <Heading size="lg" mb={6}>
        Settings
      </Heading>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Account</Tab>
          <Tab>Notifications</Tab>
          <Tab>Privacy</Tab>
        </TabList>

        <TabPanels mt={4}>
          {/* Profile Tab */}
          <TabPanel>
            <Stack spacing={4}>
              <Heading size="md">Edit Profile</Heading>
              <Input
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                placeholder="Full Name"
              />
              <Input
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="Email"
                type="email"
              />
              <Input
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                placeholder="Username"
              />
              <Button
                onClick={handleProfileUpdate}
                colorScheme="blue"
                w="fit-content"
              >
                Save Changes
              </Button>
            </Stack>
          </TabPanel>

          {/* Account Tab */}
          <TabPanel>
            <ChangePassword user={currentUser} />
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel>
            <Stack spacing={6}>
              <Heading size="md">Notification Preferences</Heading>
              <Flex justify="space-between" align="center">
                <Text>Email Notifications</Text>
                <Switch />
              </Flex>
              <Flex justify="space-between" align="center">
                <Text>Push Notifications</Text>
                <Switch />
              </Flex>
              <Flex justify="space-between" align="center">
                <Text>SMS Notifications</Text>
                <Switch />
              </Flex>
            </Stack>
          </TabPanel>

          {/* Privacy Tab */}
          <TabPanel>
            <DeleteAccount user={currentUser} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Settings;
