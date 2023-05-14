import type { NextPage } from "next";
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Account } from "./Account";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { CoffeeABI, contractAddress } from "./constants";
import { parseEther } from "viem";

const Home: NextPage = () => {
  /* state values  */
  const [hasMounted, setHasMounted] = useState(false);
  const { address } = useAccount();
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  /* TODO :contract read operations */

  /*  TODO: contract write  */

  /* check mounted to avoid hydration issues*/
  if (!hasMounted) return null;

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function clearValues() {
    setMessage("");
    setName("");
  }

  return (
    <Container maxW={"1200px"} w={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"20px"}
        height={"120px"}
      >
        <Box>
          <Text fontWeight={"bold"}>Buy Me A Coffee</Text>
        </Box>
        <Account />
      </Flex>
      <SimpleGrid columns={2} spacing={10} mt={"40px"}>
        <Box>
          <Card>
            <CardBody>
              <Heading mb={"20px"}>Buy a Coffee</Heading>
              <Flex direction={"row"}>
                <Text>Total Coffees: </Text>
                {/* <Skeleton
                  isLoaded={!coffeeCount.isLoading}
                  width={"20px"}
                  ml={"5px"}
                >
                  {coffeeCount.data?.toString()}
                </Skeleton> */}
              </Flex>
              <Text fontSize={"2xl"} py={"10px"}>
                Name:
              </Text>
              <Input
                placeholder="John Doe"
                maxLength={16}
                value={name}
                onChange={handleNameChange}
              />
              <Text fontSize={"2xl"} mt={"10px"} py={"10px"}>
                Message:
              </Text>
              <Input
                placeholder="Hello"
                maxLength={80}
                value={message}
                onChange={handleMessageChange}
              />
              <Box mt={"20px"}>
                {address ? (
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                    onClick={() => {
                      // TODO : call write and clearvalues
                    }}
                  >
                    {/* {isLoading ? (
                      <div>{"Sending"}</div>
                    ) : (
                      <div>{"Buy a coffee 0.01ETH"}</div>
                    )} */}
                  </button>
                ) : (
                  <Text>Please connect your wallet</Text>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card maxH={"60vh"} overflow={"scroll"}>
            <CardBody>
              <Text fontWeight={"bold"}>Recent Messages:</Text>
              {/*
                <Box>

                      return (
                        <Card key={index} my={"10px"}>
                          <CardBody>
                            <Text fontSize={"2xl"}>{coffee.message}</Text>
                            <Text>From: {coffee.name}</Text>
                          </CardBody>
                        </Card>
                      );

                </Box>
              ) : ( */}
              <Stack>
                <Skeleton height={"100px"} />
                <Skeleton height={"100px"} />
                <Skeleton height={"100px"} />
              </Stack>
              {/* )} */}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
