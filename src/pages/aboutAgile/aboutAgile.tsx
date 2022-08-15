import {
  Headings,
  Copy,
  ExternalLink,
  Buttons,
  Spacing,
} from "../../components";
import { Main } from "../../components/containers";

const Text = Copy.Copy;
export const AboutAgile = () => {
  return (
    <Main>
      <Headings.H2 size={2}>About Agile</Headings.H2>
      <Text>
        Find out more about agile by reading the{" "}
        <ExternalLink href="https://agilemanifesto.org/principles.html">
          12 principles that underly the agile manifesto
        </ExternalLink>{" "}
        and the{" "}
        <ExternalLink href="https://agilemanifesto.org">
          Agile Manifresto
        </ExternalLink>
      </Text>
      <Text>
        Agile isn't static and opinions have grown from the initital manefesto.
        If you're interested in more recent takes on agile have a look at{" "}
        <ExternalLink href="https://modernagile.org/">
          Modern Agile
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink href="https://heartofagile.com/">
          The heart of agile
        </ExternalLink>
        .
      </Text>
      <Buttons.ButtonLink to="/quiz" cssOverride={Spacing.Margin.top1}>
        Dont like the result? Start over.
      </Buttons.ButtonLink>
    </Main>
  );
};
