import {
  CheckboxGroup,
  Fieldset,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { Field } from "./ui/field";
import { useRouter } from "next/router";

const ReadOnly = () => {
  const [state, setState] = React.useState({
    voornaam: "",
    achternaam: "",
    email: "",
    telefoonnummer: "",
    adres: "",
    postcode: "",
    woonplaats: "",
    bsn: "",
    geboorteplaats: "",
    verblijfsvergunningNummer: "",
    taalniveau: "",
    uitkeringsstatus: "",
    naturalisatieStatus: "",
    voorkantIdentiteitsbewijs: "",
    achterkantIdentiteitsbewijs: "",
    opleidingWiltVolgen: "",
    provincie: "",
    beschikbareDagen: "",
    beschikbareTijden: "",
    geboortedatum: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/get-single-record?email=${router.query.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          // setState(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  console.log(router);

  return (
    <Stack w={"100%"} h={"100vh"}>
      <form>
        <VStack
          w={{ base: "100%", md: "80%", lg: "50%" }}
          mx={{ base: "0", md: "auto" }}
          p={{ base: "4" }}
          shadow={"md"}
          mt={{ base: "4", md: "8" }}
          h={"100%"}
          alignItems={"center"}
        >
          <HStack>
            <Text fontSize={"x-large"} fontWeight={"bold"} w={"100%"}>
              ESF+ Subsidie Formulier
            </Text>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Voornaam">
              <Input
                onChange={(e) => {}}
                value={state.voornaam}
                name="firstname"
              />
            </Field>
            <Field label="Achternaam">
              <Input
                onChange={(e) => {}}
                value={state.achternaam}
                name="lastname"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Email">
              <Input onChange={(e) => {}} value={state.email} name="email" />
            </Field>
            <Field label="Telefoonnummer">
              <Input
                onChange={(e) => {}}
                value={state.telefoonnummer}
                name="phone"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Adres">
              <Input onChange={(e) => {}} value={state.adres} name="address" />
            </Field>
            <Field label="Postcode">
              <Input
                onChange={(e) => {}}
                value={state.postcode}
                name="postcode"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Woonplaats">
              <Input
                onChange={(e) => {}}
                value={state.woonplaats}
                name="city"
              />
            </Field>
            <Field label="Provincie">
              <Input
                onChange={(e) => {}}
                value={state.provincie}
                name="provincie"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Geboortedatum">
              <Input
                onChange={(e) => {}}
                type="date"
                value={state.geboortedatum}
                name="birthdate"
              />
            </Field>
            <Field label="Geboorteplaats">
              <Input
                onChange={(e) => {}}
                value={state.geboorteplaats}
                name="birthplace"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Verblijfsvergunningnummer of ID-nummer">
              <Input
                onChange={(e) => {}}
                value={state.verblijfsvergunningNummer}
                name="residencePermitNumber"
              />
            </Field>
            <Field label="Burgerservicenummer (BSN)">
              <Input onChange={(e) => {}} value={state.bsn} name="bsn" />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label="Taal niveau">
              <Input
                onChange={(e) => {}}
                value={state.taalniveau}
                name="languageLevel"
              />
            </Field>
            <Field label="Uitkeringsstatus">
              <Input
                onChange={(e) => {}}
                value={state.uitkeringsstatus}
                name="uitkeringsstatus"
              />
            </Field>
            <Field label="Naturalisatie status">
              <Input
                onChange={(e) => {}}
                value={state.naturalisatieStatus}
                name="naturalisatie status"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column" }}>
            <Fieldset.Root>
              <CheckboxGroup>
                <Fieldset.Legend fontSize="sm" mb="2">
                  Welke opleiding wilt u volgen?
                </Fieldset.Legend>
                <Fieldset.Content>
                  <Checkbox value="Nederlands taalcursus Intensief (B1-B2)">
                    Nederlands taalcursus Intensief (B1-B2)
                  </Checkbox>
                </Fieldset.Content>
              </CheckboxGroup>
            </Fieldset.Root>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column" }}>
            <Text
              fontWeight={"450"}
              fontSize={"15px"}
              w={"100%"}
              textAlign={"left"}
            >
              ⁠Beschikbare dagen en tijden. ⁠Op welke dagen en tijden bent u
              beschikbaar voor de opleiding?
            </Text>
            <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
              <Field label="Beschikbare Dagen">
                <Input
                  onChange={(e) => {}}
                  value={state.beschikbareDagen}
                  name="dagen"
                />
              </Field>
              <Field label="Beschikbare Tijden">
                <Input
                  onChange={(e) => {}}
                  value={state.beschikbareTijden}
                  name="tijden"
                />
              </Field>
            </HStack>
          </HStack>
        </VStack>
      </form>
    </Stack>
  );
};

export default ReadOnly;
