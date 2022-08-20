import { Headings, Copy, ExternalLink, Buttons, Spacing } from "../components";
import { Main } from "../components/containers";

const Text = Copy.Copy;
export default () => {
  return (
    <Main>
      <Headings.H1 size={2}>About agile</Headings.H1>
      <Text>
        agile (with a little a) is about delivering value to your customers as
        quickly as possible. It does this through constant collaboration,
        feedback and iteration. Originally it was conceved as a reaction to the
        slow moving, documentation heavy "Waterfall" projects of the 1990's.
      </Text>
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
        While the term agile has been around since 2001 it isn't static and
        opinions have grown from the initital manefesto. If you're interested in
        more recent takes on agile have a look at{" "}
        <ExternalLink href="https://modernagile.org/">
          Modern Agile
        </ExternalLink>{" "}
        and{" "}
        <ExternalLink href="https://heartofagile.com/">
          The heart of agile
        </ExternalLink>
        .
      </Text>
      <Buttons.ButtonLink to="/" cssOverride={Spacing.Margin.top1}>
        home
      </Buttons.ButtonLink>
    </Main>
  );
};
