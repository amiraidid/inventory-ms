import { Center, Spinner, Text } from "@chakra-ui/react"

function Loader() {
  return (
    <Center>
        <Spinner size="xl" thickness="4px" color="purple.500" />
        <Text ml="3">Loading, please wait...</Text>
      </Center>
  );
}

export default Loader;
