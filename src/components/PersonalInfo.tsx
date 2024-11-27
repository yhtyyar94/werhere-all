import {
  HStack,
  Input,
  Stack,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import React from "react";
import { Field } from "./ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";

const PersonalInfo = () => {
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
    begindatum: "",
    einddatum: "",
    taalniveau: "",
    uitkeringsstatus: "",
    naturalisatieStatus: "",
    voorkantIdentiteitsbewijs: "",
    achterkantIdentiteitsbewijs: "",
    geboortedatum: "",
  });
  const [voorkant, setVoorkant] = React.useState<File | null>(null);
  const [achterkant, setAchterkant] = React.useState<File | null>(null);
  const languageLevel = createListCollection({
    items: [
      { label: "A1", value: "A1" },
      { label: "A2", value: "A2" },
      { label: "B1", value: "B1" },
      { label: "B2", value: "B2" },
      { label: "C1", value: "C1" },
    ],
  });
  const socilBenefitStatus = createListCollection({
    items: [
      { label: "Ja", value: "JA" },
      { label: "Nee", value: "NEE" },
      { label: "Deel", value: "DEEL" },
    ],
  });
  const nationalityStatus = createListCollection({
    items: [
      { label: "Ja", value: "JA" },
      { label: "Nee", value: "NEE" },
    ],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("voornaam", state.voornaam);
    formData.append("achternaam", state.achternaam);
    formData.append("email", state.email);
    formData.append("telefoonnummer", state.telefoonnummer);
    formData.append("adres", state.adres);
    formData.append("postcode", state.postcode);
    formData.append("woonplaats", state.woonplaats);
    formData.append("bsn", state.bsn);
    formData.append("geboorteplaats", state.geboorteplaats);
    formData.append(
      "verblijfsvergunningNummer",
      state.verblijfsvergunningNummer
    );
    formData.append("begindatum", state.begindatum);
    formData.append("einddatum", state.einddatum);
    formData.append("taalniveau", state.taalniveau);
    formData.append("uitkeringsstatus", state.uitkeringsstatus);
    formData.append("naturalisatieStatus", state.naturalisatieStatus);
    formData.append("voorkantIdentiteitsbewijs", voorkant as Blob);
    formData.append("achterkantIdentiteitsbewijs", achterkant as Blob);
    const response = await fetch("/api/create-record", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Stack w={"100%"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <VStack
          w={{ base: "100%", md: "50%" }}
          mx={{ base: "0", md: "auto" }}
          p={{ base: "4", md: "0" }}
        >
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Voornaam"}>
              <Input
                // required={true}
                placeholder="Vul je voornaam in"
                value={state.voornaam}
                onChange={(e) =>
                  setState({ ...state, voornaam: e.target.value })
                }
                name="firstname"
              />
            </Field>
            <Field label={"Achternaam"}>
              <Input
                // required={true}
                placeholder="Vul je achternaam in"
                value={state.achternaam}
                onChange={(e) =>
                  setState({ ...state, achternaam: e.target.value })
                }
                name="lastname"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Email"}>
              <Input
                // required={true}
                placeholder="Vul je email in"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                name="email"
              />
            </Field>
            <Field label={"Telefoonnummer"}>
              <Input
                // required={true}
                placeholder="Vul je telefoonnummer in"
                value={state.telefoonnummer}
                onChange={(e) =>
                  setState({ ...state, telefoonnummer: e.target.value })
                }
                name="phone"
              />
            </Field>
          </HStack>
          <VStack w={"100%"}>
            <Field label={"Adres"}>
              <Input
                // required={true}
                placeholder="Vul je adres in"
                value={state.adres}
                onChange={(e) => setState({ ...state, adres: e.target.value })}
                name="address"
              />
            </Field>
          </VStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Postcode"}>
              <Input
                // required={true}
                placeholder="Vul je postcode in"
                value={state.postcode}
                onChange={(e) =>
                  setState({ ...state, postcode: e.target.value })
                }
                name="postcode"
              />
            </Field>
            <Field label={"Woonplaats"}>
              <Input
                // required={true}
                placeholder="Vul je woonplaats in"
                value={state.woonplaats}
                onChange={(e) =>
                  setState({ ...state, woonplaats: e.target.value })
                }
                name="city"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Burgerservicenummer (BSN)"}>
              <Input
                // required={true}
                placeholder="Vul je BSN in"
                value={state.bsn}
                onChange={(e) => setState({ ...state, bsn: e.target.value })}
                name="bsn"
              />
            </Field>
            <Field label={"Geboorteplaats"}>
              <Input
                // required={true}
                placeholder="Vul je geboorteplaats in"
                value={state.geboortedatum}
                onChange={(e) =>
                  setState({ ...state, geboortedatum: e.target.value })
                }
                name="birthplace"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Verblijfsvergunning nummer"}>
              <Input
                // required={true}
                placeholder="Vul je Verblijfsvergunning nummer in"
                value={state.verblijfsvergunningNummer}
                onChange={(e) =>
                  setState({
                    ...state,
                    verblijfsvergunningNummer: e.target.value,
                  })
                }
                name="residencePermitNumber"
              />
            </Field>
            <Field label={"Begindatum"}>
              <Input
                // required={true}
                type="date"
                value={state.begindatum}
                onChange={(e) =>
                  setState({ ...state, begindatum: e.target.value })
                }
                name="startDate"
              />
            </Field>
            <Field label={"Einddatum"}>
              <Input
                // required={true}
                type="date"
                value={state.einddatum}
                onChange={(e) =>
                  setState({ ...state, einddatum: e.target.value })
                }
                name="endDate"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <SelectRoot
              collection={languageLevel}
              size="sm"
              onValueChange={(e) =>
                setState({ ...state, taalniveau: e.value[0] })
              }
              //   required={true}
            >
              <SelectLabel>Taal niveau</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Taalniveau selecteren" />
              </SelectTrigger>
              <SelectContent>
                {languageLevel.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <SelectRoot
              collection={socilBenefitStatus}
              size="sm"
              onValueChange={(e) =>
                setState({ ...state, uitkeringsstatus: e.value[0] })
              }
              //   required={true}
            >
              <SelectLabel>Uitkeringsstatus</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Uitkeringsstatus selecteren" />
              </SelectTrigger>
              <SelectContent>
                {socilBenefitStatus.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <SelectRoot
              collection={nationalityStatus}
              size="sm"
              onValueChange={(e) =>
                setState({ ...state, naturalisatieStatus: e.value[0] })
              }
              //   required={true}
            >
              <SelectLabel>Naturalisatie status</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Naturalisatie status selecteren" />
              </SelectTrigger>
              <SelectContent>
                {nationalityStatus.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Voorkant van uw identiteitsbewijs"}>
              <FileUploadRoot
                maxFiles={1}
                // required={true}
                onFileChange={(e) => setVoorkant(e.acceptedFiles[0])}
              >
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm">
                    <HiUpload /> Upload file
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            </Field>
            <Field label={"Achterkant van uw identiteitsbewijs"}>
              <FileUploadRoot
                maxFiles={1}
                // required={true}
                onFileChange={(e) => setAchterkant(e.acceptedFiles[0])}
              >
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm">
                    <HiUpload /> Upload file
                  </Button>
                </FileUploadTrigger>
                <FileUploadList />
              </FileUploadRoot>
            </Field>
          </HStack>
          <HStack
            w={"100%"}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
          >
            <Button type="submit" w={{ base: "100%" }}>
              Indienen
            </Button>
          </HStack>
        </VStack>
      </form>
    </Stack>
  );
};

export default PersonalInfo;
