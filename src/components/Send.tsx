import { SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  Input,
} from "@chakra-ui/react";
import { utils } from "ethers";
import { useSendTransaction } from "@usedapp/core";

export default function Send() {
  const { sendTransaction, state } = useSendTransaction();
  const [disabled, setDisabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const sendTxn = () => {
    setDisabled(true);
    sendTransaction({ to: address, value: utils.parseEther(amount) });
  };

  const handleAmount = (valueAsString: string, valueAsNumber: number) => {
    setAmount(valueAsString);
  };

  const handleAddress = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    if (state.status !== "Mining") {
      setDisabled(false);
    }
  }, [state]);

  return (
    <Flex direction="column" align="center" mt="4">
      <Box mt={4}>
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          Send
        </Text>
        <NumberInput
          mb={2}
          min={1}
          value={amount}
          onChange={handleAmount}
          color="white"
          clampValueOnBlur={false}
        >
          <NumberInputField placeholder="ETH Amount" />
        </NumberInput>
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          Eth To:
        </Text>
        <Input
          placeholder="Address"
          value={address}
          color="white"
          mb={2}
          onChange={handleAddress}
        ></Input>
        <Button
          isFullWidth
          colorScheme="purple"
          onClick={sendTxn}
          disabled={disabled}
        >
          Send
        </Button>
      </Box>
    </Flex>
  );
}
