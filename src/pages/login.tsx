import { FormEvent } from "react";
import { useRouter } from "next/router";
import { Button, HStack, Input, Stack, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const res = await response.json();
    if (res.status === "success") {
      dispatch(login(username as string));
      router.push("/admin");
    } else {
      // Handle errors
    }
  }

  return (
    <Stack display={"flex"} justifyContent={"center"} w={"100%"} h={"100vh"}>
      <Stack w={{ base: "100%", md: "40%", lg: "30%" }} mx={"auto"}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Field label="Username">
            <Input name="username" type="text" />
          </Field>
          <Field label="Password">
            <Input name="password" type="password" />
          </Field>
          <HStack mt={5} justifyContent={"center"} w={"100%"}>
            <Button w={"100%"} type="submit" colorPalette={"red"}>
              Login
            </Button>
          </HStack>
        </form>
      </Stack>
    </Stack>
  );
}
