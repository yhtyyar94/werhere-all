import {
  CheckboxGroup,
  Fieldset,
  HStack,
  Input,
  Stack,
  Text,
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
import { Checkbox } from "@/components/ui/checkbox";
import { toaster, Toaster } from "@/components/ui/toaster";

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
  const [voorkant, setVoorkant] = React.useState<File | null>(null);
  const [achterkant, setAchterkant] = React.useState<File | null>(null);
  const [andereOpleiding, setAndereOpleiding] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [andereOpleidingValue, setAndereOpleidingValue] = React.useState("");

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
    ],
  });
  const nationalityStatus = createListCollection({
    items: [
      { label: "Ja", value: "JA" },
      { label: "Nee", value: "NEE" },
    ],
  });

  const dagen = createListCollection({
    items: [
      { label: "Maandag", value: "Maandag" },
      { label: "Dinsdag", value: "Dinsdag" },
      { label: "Woensdag", value: "Woensdag" },
      { label: "Donderdag", value: "Donderdag" },
      { label: "Vrijdag", value: "Vrijdag" },
      { label: "Zaterdag", value: "Zaterdag" },
      { label: "Zondag", value: "Zondag" },
    ],
  });

  const tijden = createListCollection({
    items: [
      { label: "Ochtend", value: "Ochtend" },
      { label: "Middag", value: "Middag" },
      { label: "Avond", value: "Avond" },
    ],
  });

  const opleidingen = createListCollection({
    items: [
      {
        label: "Nederlands taalcursus Intensief (B1-B2)",
        value: "Nederlands taalcursus Intensief (B1-B2)",
      },
      {
        label: "Spreekvaardigheid Nederlands (B1-B2)",
        value: "Spreekvaardigheid Nederlands (B1-B2)",
      },
      { label: "Vaktaal IT", value: "Vaktaal IT" },
      {
        label: "Vaktaal/Vakdidactiek Onderwijs",
        value: "Vaktaal/Vakdidactiek Onderwijs",
      },
      {
        label: "Vaktaal Financieel Administratief",
        value: "Vaktaal Financieel Administratief",
      },
      { label: "VIT (Voorbereiding IT)", value: "VIT (Voorbereiding IT)" },
      {
        label: "Leer-werkprogramma Data Engineer",
        value: "Leer-werkprogramma Data Engineer",
      },
      {
        label: "Leer-werkprogramma Data Analyst",
        value: "Leer-werkprogramma Data Analyst",
      },
      { label: "Anders", value: "Anders" },
    ],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let value = state.opleidingWiltVolgen;
    if (andereOpleidingValue != "") {
      value = value + "," + andereOpleidingValue;
    }

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
    formData.append("taalniveau", state.taalniveau);
    formData.append("uitkeringsstatus", state.uitkeringsstatus);
    formData.append("naturalisatieStatus", state.naturalisatieStatus);
    formData.append("voorkantIdentiteitsbewijs", voorkant as Blob);
    formData.append("achterkantIdentiteitsbewijs", achterkant as Blob);
    formData.append("opleidingWiltVolgen", value);
    formData.append("provincie", state.provincie);
    formData.append("beschikbareDagen", state.beschikbareDagen);
    formData.append("beschikbareTijden", state.beschikbareTijden);
    formData.append("geboortedatum", state.geboortedatum);
    setLoading(true);
    const response = await fetch("/api/create-record", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.status === "success") {
      toaster.create({
        title: "Succes",
        description: "Uw gegevens zijn succesvol verzonden",
        type: "success",
      });
      window.alert("Uw gegevens zijn succesvol verzonden");
      // setState({
      //   voornaam: "",
      //   achternaam: "",
      //   email: "",
      //   telefoonnummer: "",
      //   adres: "",
      //   postcode: "",
      //   woonplaats: "",
      //   bsn: "",
      //   geboorteplaats: "",
      //   verblijfsvergunningNummer: "",
      //   taalniveau: "",
      //   uitkeringsstatus: "",
      //   naturalisatieStatus: "",
      //   voorkantIdentiteitsbewijs: "",
      //   achterkantIdentiteitsbewijs: "",
      //   opleidingWiltVolgen: "",
      //   provincie: "",
      //   beschikbareDagen: "",
      //   beschikbareTijden: "",
      //   geboortedatum: "",
      // });
      setAndereOpleiding(false);
      // setAndereOpleidingValue("");
      setLoading(false);
    } else {
      toaster.create({
        title: "Error",
        description: "Failed to upload files",
        type: "error",
      });
      setLoading(false);
    }
  };
  console.log(state);

  const handelCheckboxChange = (e: any) => {
    if ((e.target as HTMLInputElement).checked) {
      const value = state.opleidingWiltVolgen.split(",");
      value.push((e.target as HTMLInputElement).value);
      setState({
        ...state,
        opleidingWiltVolgen: value.join(","),
      });
    } else {
      const value = state.opleidingWiltVolgen.split(",");
      const index = value.indexOf((e.target as HTMLInputElement).value);
      value.splice(index, 1);
      setState({
        ...state,
        opleidingWiltVolgen: value.join(","),
      });
    }
  };
  return (
    <Stack w={"100%"} h={"100vh"}>
      <form onSubmit={(e) => handleSubmit(e)}>
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
            <Field label={"Voornaam"}>
              <Input
                required={true}
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
                required={true}
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
                required={true}
                placeholder="Vul je email in"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                name="email"
              />
            </Field>
            <Field label={"Telefoonnummer"}>
              <Input
                required={true}
                placeholder="Vul je telefoonnummer in"
                value={state.telefoonnummer}
                onChange={(e) =>
                  setState({ ...state, telefoonnummer: e.target.value })
                }
                name="phone"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Adres"}>
              <Input
                required={true}
                placeholder="Vul je adres in"
                value={state.adres}
                onChange={(e) => setState({ ...state, adres: e.target.value })}
                name="address"
              />
            </Field>
            <Field label={"Postcode"}>
              <Input
                required={true}
                placeholder="Vul je postcode in"
                value={state.postcode}
                onChange={(e) =>
                  setState({ ...state, postcode: e.target.value })
                }
                name="postcode"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Woonplaats"}>
              <Input
                required={true}
                placeholder="Vul je woonplaats in"
                value={state.woonplaats}
                onChange={(e) =>
                  setState({ ...state, woonplaats: e.target.value })
                }
                name="city"
              />
            </Field>
            <Field label={"Provincie"}>
              <Input
                required={true}
                placeholder="In welke provincie woont u?"
                value={state.provincie}
                onChange={(e) =>
                  setState({ ...state, provincie: e.target.value })
                }
                name="provincie"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Geboortedatum"}>
              <Input
                required={true}
                type="date"
                value={state.geboortedatum}
                onChange={(e) =>
                  setState({ ...state, geboortedatum: e.target.value })
                }
                name="birthdate"
              />
            </Field>
            <Field label={"Geboorteplaats"}>
              <Input
                required={true}
                placeholder="Vul je geboorteplaats in"
                value={state.geboorteplaats}
                onChange={(e) =>
                  setState({ ...state, geboorteplaats: e.target.value })
                }
                name="birthplace"
              />
            </Field>
          </HStack>
          <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Verblijfsvergunningnummer of ID-nummer"}>
              <Input
                required={true}
                placeholder="Vul je Verblijfsvergunningnummer of ID-nummer in"
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
            <Field label={"Burgerservicenummer (BSN)"}>
              <Input
                required={true}
                placeholder="Vul je BSN in"
                value={state.bsn}
                onChange={(e) => setState({ ...state, bsn: e.target.value })}
                name="bsn"
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
              required={true}
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
              required={true}
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
              required={true}
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
          <HStack w={"100%"} flexDirection={{ base: "column" }}>
            <Fieldset.Root>
              <CheckboxGroup>
                <Fieldset.Legend fontSize="sm" mb="2">
                  Welke opleiding wilt u volgen?
                </Fieldset.Legend>
                <Fieldset.Content>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="Nederlands taalcursus Intensief (B1-B2)"
                  >
                    Nederlands taalcursus Intensief (B1-B2)
                  </Checkbox>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="Spreekvaardigheid Nederlands (B1-B2)"
                  >
                    Spreekvaardigheid Nederlands (B1-B2)
                  </Checkbox>
                  <Checkbox onChange={handelCheckboxChange} value="Vaktaal IT">
                    Vaktaal IT
                  </Checkbox>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="Vaktaal/Vakdidactiek Onderwijs"
                  >
                    Vaktaal/Vakdidactiek Onderwijs
                  </Checkbox>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="Vaktaal Financieel Administratief"
                  >
                    Vaktaal Financieel Administratief
                  </Checkbox>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="VIT (Voorbereiding IT)"
                  >
                    VIT (Voorbereiding IT)
                  </Checkbox>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="Leer-werkprogramma Data Engineer"
                  >
                    Leer-werkprogramma Data Engineer
                  </Checkbox>
                  <Checkbox
                    onChange={handelCheckboxChange}
                    value="Leer-werkprogramma Data Analyst"
                  >
                    Leer-werkprogramma Data Analyst
                  </Checkbox>
                  <Checkbox
                    value="Anders"
                    onChange={() => setAndereOpleiding(!andereOpleiding)}
                  >
                    Anders
                  </Checkbox>
                </Fieldset.Content>
              </CheckboxGroup>
            </Fieldset.Root>

            {andereOpleiding && (
              <Field>
                <Input
                  required={true}
                  type="text"
                  value={andereOpleidingValue}
                  onChange={(e) => setAndereOpleidingValue(e.target.value)}
                  name="opleidingWiltVolgen"
                  placeholder="Vul de opleiding in die u wilt volgen"
                />
              </Field>
            )}
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
              <SelectRoot
                collection={dagen}
                multiple
                size="sm"
                onValueChange={(e) =>
                  setState({ ...state, beschikbareDagen: e.value.join(", ") })
                }
                required={true}
              >
                <SelectLabel>Dagen</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Kies de dag waarop u beschikbaar bent" />
                </SelectTrigger>
                <SelectContent>
                  {dagen.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              <SelectRoot
                collection={tijden}
                multiple
                size="sm"
                onValueChange={(e) =>
                  setState({ ...state, beschikbareTijden: e.value.join(", ") })
                }
                required={true}
              >
                <SelectLabel>Tijden</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Kies het tijdstip waarop u beschikbaar bent" />
                </SelectTrigger>
                <SelectContent>
                  {tijden.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </HStack>
          </HStack>

          {/* <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
            <Field label={"Voorkant van uw identiteitsbewijs"}>
              <FileUploadRoot
                maxFiles={1}
                required={true}
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
                required={true}
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
          </HStack> */}
          <HStack my={2}>
            <Checkbox name="terms" required={true}>
              Door op ‘Indienen’ te klikken, geef ik toestemming voor het
              verwerken van mijn gegevens zoals beschreven. De gegevens die in
              dit formulier worden opgenomen, worden uitsluitend gebruikt voor
              de verantwoording van de ESF+ subsidie en zullen op geen enkele
              manier verder worden verspreid buiten de aangesloten partijen die
              direct betrokken zijn bij deze subsidieaanvraag. De gegevens
              worden uitsluitend bewaard zolang dit noodzakelijk is voor de
              verantwoording van de ESF+ subsidie en worden daarna vernietigd
              conform de AVG-richtlijnen. Door dit formulier in te dienen,
              verklaar ik de bovenstaande informatie te hebben gelezen en ga ik
              akkoord met het verwerken van mijn gegevens onder de genoemde
              voorwaarden.
            </Checkbox>
          </HStack>
          <HStack
            w={"100%"}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            my={5}
          >
            <Button
              type="submit"
              w={{ base: "100%" }}
              colorPalette={"red"}
              disabled={loading}
            >
              Indienen
            </Button>
            <Toaster />
          </HStack>
        </VStack>
      </form>
    </Stack>
  );
};

export default PersonalInfo;
