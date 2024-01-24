import { useState, useEffect } from "react";

import ProfileCard from "components/ProfileCard";
import Card from "components/Card";
import { PrimaryButton, SecondaryButton } from "components/Button";
import { Input, TextArea } from "components/Form";
import NewTabLink from "components/NewTabLink";
import Container from "components/Container";
import { profile, CoffeeABI, contractAddress } from "lib";
import AppNavbar from "components/AppNavbar";
import emojiStrip from "emoji-strip";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";

export default function Coffee() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(3);
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => setMessage(emojiStrip(e.target.value));
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(Math.floor(e.target.value));

  const coffeeCount = useContractRead({
    address: contractAddress,
    abi: CoffeeABI,
    functionName: "getTotalCoffee",
    watch: true,
  });

  /* contract read operations */
  const allCoffee = useContractRead({
    address: contractAddress,
    abi: CoffeeABI,
    functionName: "getAllCoffee",
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: CoffeeABI,
    functionName: "buyCoffee",
    args: [message, name],
    value: parseEther("0.01") as any,
  });

  const { data, write } = useContractWrite(config);
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    write?.();
    setName("");
    setPrice(3);
    setMessage("");
  };

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-r from-purple-300 via-yellow-200 to-violet-400 w-full pb-10">
      <AppNavbar />
      <Container>
        <div className="mx-auto mt-8">
          <div className="text-lg font-medium leading-6 text-gray-900 flex space-x-2">
            <div>Building a full-stack dapp on Polygon</div>
          </div>
          <div className="mt-2 text-sm text-gray-500 max-w-2xl">
            This is a demo app on how to build an simple dapp with solidity {""}
            <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
              <NewTabLink href="https://faucet.polygon.technology/">
                faucet
              </NewTabLink>
            </span>{" "}
            to try out the app. Contracts are deployed on{" "}
            <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
              <NewTabLink href="https://mumbai.polygonscan.com/address/0x5FbDB2315678afecb367f032d93F642f64180aa3">
                testnet
              </NewTabLink>
            </span>
            . You can find a source code on{" "}
            <span className="text-gray-800 font-semibold hover:underline cursor-pointer">
              <NewTabLink href="https://github.com/Sameerkash/polygon-zero-to-hero/tree/main/coffee-machine">
                Github
              </NewTabLink>
            </span>
          </div>
        </div>
        <div className="md:flex gap-4 justify-center pt-8 max-w mb-16">
          <div className="flex flex-col gap-4">
            <ProfileCard profile={profile} />
            <Card>
              <div className="p-8">
                <div className="font-semibold text-base text-zinc-800">
                  Recent supporters{" "}
                  {coffeeCount.data && `(${coffeeCount.data?.toString()})`}
                </div>
                {!allCoffee.isLoading && allCoffee.data != null ? (
                  <>
                    {(allCoffee.data as Array<Object>)
                      .map((coffee: any, index: number) => (
                        <div
                          key={index}
                          className="flex border-b last:border-b-0 py-4 space-x-4 items-start"
                        >
                          {/* <div className="text-4xl w-12 h-12 flex justify-center items-center">
                          {([1, 3, 5].includes(tx.amount) && '☕️') || '🔥'}
                        </div> */}
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <div className=" text-sm text-zinc-600">
                                <span className="font-semibold">
                                  {coffee.name || "Someone"}
                                </span>{" "}
                                bought{" "}
                                {/* <span className="font-semibold">{coffee.amount}</span>{' '} */}
                                coffee(s)
                              </div>
                              {/* <NewTabLink
                                // href={`${explorerUrl}/txid/${tx.id}`}
                                className={`text-xs hover:underline cursor-pointer ${
                                  allCoffee.status === 'loading'
                                    ? 'text-orange-500'
                                    : 'text-zinc-600'
                                }`}
                              >
                                {coffee.status === 'success' ? '🚀' : '⌛'}{' '}
                                {/* {truncateUrl(tx.id)} */}
                              {/* </NewTabLink> */}
                            </div>
                            <div className="text-xs mt-1 text-zinc-600">
                              {coffee?.timestamp ? (
                                new Date(
                                  Number(coffee?.timestamp) * 1000
                                ).toLocaleString("en-US", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              ) : (
                                <div className="text-orange-500">
                                  Transaction is pending
                                </div>
                              )}
                            </div>
                            {coffee.message && (
                              <div className="border mt-4 border-blue-300 rounded w-fit bg-blue-50 px-4 py-2 text-sm text-zinc-600 flex space-x-2">
                                <span className="text-lg">💬</span>{" "}
                                <span>{coffee.message}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                      .reverse()}
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-4 sm:mt-0">
            <Card>
              <div className="p-8 items-center text-center mx-auto w-full">
                <div className="flex justify-between">
                  <div className="font-semibold text-lg mb-4 text-left">
                    Buy <span className="font-bold text-blue-500">Sameer</span>{" "}
                    a coffee
                  </div>

                  <div>
                    <div className="ml-2 rounded-xl capitalize inline-flex border px-2 py-0.5 text-xs font-semibold text-zinc-500">
                      {process.env.NEXT_PUBLIC_NETWORK || "devnet"}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex space-x-4   items-center bg-blue-50 border-blue-200 border rounded p-4">
                    <div className="text-4xl">☕️</div>
                    <div className="text-xl text-blue-500 font-bold">x</div>

                    <SelectItem
                      setPrice={setPrice}
                      price={price}
                      currentValue={1}
                    />
                    <SelectItem
                      setPrice={setPrice}
                      price={price}
                      currentValue={3}
                    />
                    <SelectItem
                      setPrice={setPrice}
                      price={price}
                      currentValue={5}
                    />

                    <div className="w-10">
                      <Input
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                  <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name or @twitter"
                    label="Name"
                  />
                  <TextArea
                    value={message}
                    rows={6}
                    onChange={handleMessageChange}
                    placeholder="Thank you for the support. Feel free to leave a comment about how this session helped you!"
                    label="Message"
                  />

                  {address ? (
                    <PrimaryButton type="submit">
                      {isLoading ? (
                        <div>{"Sending"}</div>
                      ) : (
                        <div>Support with 0.01 x{price}</div>
                      )}
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton type="disable">
                      Please connect your wallet
                    </SecondaryButton>
                  )}
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

const SelectItem = ({ price, currentValue, setPrice }) => (
  <div
    className={`font-semibold  flex items-center border justify-center w-8 h-8 rounded-full cursor-pointer ${
      price == currentValue
        ? "bg-blue-500 text-white"
        : "text-blue-500 bg-white border-blue-100"
    }`}
    onClick={() => setPrice(currentValue)}
  >
    {currentValue}
  </div>
);
