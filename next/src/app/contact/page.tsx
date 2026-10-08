// GENERATED from src/pages/contact.astro by tools/astro-to-next.mjs. Edit the Astro file, then regenerate.
import Base from '@/layouts/Base';
import PageHeader from '@/components/sections/PageHeader';
import Offices from '@/components/sections/Offices';
import Faq from '@/components/sections/Faq';
import { site } from '@/lib/site';

export default async function Contact() {
  const contact = await site('contact');

  return (
    <>
      <Base route="/contact/"
        title="Contact Marby — Get in Touch"
        description="Ready to find your next property? Reach out to the Marby team for a free consultation. We're here to guide you through every step of the process."
      >
        <PageHeader label={contact.header.label} title={contact.header.title} />
        <Offices />
        <Faq />
      </Base>
    </>
  );
}
