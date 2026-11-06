import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 lg:py-40">
      <p className="eyebrow text-saffron">404</p>
      <h1 className="display mt-5 text-[3rem] sm:text-[4.5rem]">
        Page not <span className="serif-accent text-saffron">found.</span>
      </h1>
      <p className="mt-6 max-w-md text-[17px] text-ink-2">The page you were looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/phones" variant="outline">
          Explore Phones
        </ButtonLink>
      </div>
    </Container>
  );
}
