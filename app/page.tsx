import Image from "next/image";
import { ArrowRight, MapPin, AirplaneTakeoff, Clock } from "@phosphor-icons/react/dist/ssr";
import { BookingCard } from "@/components/booking-card";
import { FaqList } from "@/components/faq-list";
import { Button } from "@/components/ui/button";
import { destinations, fleet, liveSite, longTermEmail, phoneDisplay, phoneHref } from "@/lib/data";
import { cn } from "@/lib/utils";

const fleetField: Record<(typeof fleet)[number]["field"], string> = {
  gold: "bg-gold",
  wash: "bg-wash",
  navy: "bg-navy text-white",
  ice: "bg-ice",
  sky: "bg-sky text-white",
};

export default function Home() {
  const featured = destinations.find((d) => "featured" in d && d.featured) ?? destinations[0];
  const rest = destinations.filter((d) => d.name !== featured.name);
  const [second, third, fourth, ...more] = rest;

  return (
    <main id="top">
      <section className="relative isolate">
        <div className="relative min-h-[640px] lg:min-h-[760px]">
          <Image
            src="/media/hero.jpg"
            alt="Avance car on the airport road at dusk"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/20" />
          <div className="relative mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-24">
            <div className="max-w-xl text-white">
              <p className="caption text-gold">Athens Airport and the islands</p>
              <h1 className="display mt-4">
                driving{" "}
                <span className="text-gold">miles</span>
                <br />
                together
              </h1>
              <p className="mt-6 max-w-md text-lg leading-8 text-white/90">
                Check, click, pay, start your journey to Greek Summer.
              </p>
            </div>
            <div className="lg:translate-y-16">
              <BookingCard />
            </div>
          </div>
        </div>
        <div className="h-16 bg-wash lg:h-24" />
      </section>

      <section className="bg-wash">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <figure className="rounded-lg bg-navy px-8 py-10 text-white lg:col-span-7">
            <p className="caption text-gold">Read our clients reviews</p>
            <blockquote className="h2 mt-4 max-w-xl">
              DiscoverCars rates Athens Airport 8.7 from 1,607 reviews. Island desks hold Excellent Service awards for 2024.
            </blockquote>
            <figcaption className="mt-6 text-sm text-ice">
              Public partner scores, not invented quotes.
            </figcaption>
          </figure>
          <div className="grid gap-8 lg:col-span-5">
            <div className="rounded-lg bg-white px-8 py-8">
              <p className="caption text-sky">Network</p>
              <p className="h3 mt-2 text-navy">Airports, ports, and hotel desks across Greece</p>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Pickup at ATH, Santorini, Mykonos, Rhodes, Corfu, Crete, and ferry ports when you step off the boat.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 px-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/awards/peak.svg" alt="" className="h-14 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/awards/evolution.svg" alt="" className="h-14 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/awards/champion.svg" alt="" className="h-14 w-auto" />
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="caption text-sky">Explore new destinations</p>
            <h2 className="h1 mt-3 text-navy">The car is the key. Greece is the trip.</h2>
          </div>

          <article className="relative mt-12 min-h-[420px] overflow-hidden rounded-lg lg:min-h-[520px]">
            <Image
              src={featured.image}
              alt={`${featured.name}, ${featured.place}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div className="text-white">
                <h3 className="h2">{featured.name}</h3>
                <p className="mt-1 flex items-center gap-2 text-base text-white/85">
                  <MapPin size={18} />
                  {featured.place}
                </p>
              </div>
              <p className="rounded-md bg-gold px-4 py-3 text-ink">
                <span className="block text-2xl font-semibold">{featured.price}</span>
                <span className="caption">{featured.note}</span>
              </p>
            </div>
          </article>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <PlaceCard dest={second} className="min-h-[320px] lg:col-span-7" />
            <PlaceCard dest={third} className="min-h-[320px] lg:col-span-5" />
            <PlaceCard dest={fourth} className="min-h-[280px] lg:col-span-12 lg:min-h-[360px]" />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {more.map((dest, i) => (
              <PlaceCard
                key={dest.name}
                dest={dest}
                compact
                className={cn(
                  "min-h-[240px]",
                  i === 0 && "lg:col-span-7 lg:min-h-[280px]",
                  i === 1 && "lg:col-span-5",
                  i === 2 && "lg:col-span-4",
                  i === 3 && "lg:col-span-8",
                )}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="fleet" className="bg-wash">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="caption text-sky">Discover Avance’s car rental fleet</p>
              <h2 className="h1 mt-3 max-w-xl text-navy">Avance, the Greek car rental company</h2>
            </div>
            <Button asChild variant="outline">
              <a href={`${liveSite}/explore-vehicles`}>
                Explore vehicles
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            {fleet.map((car, i) => (
              <article
                key={car.name}
                className={cn(
                  "flex flex-col justify-between rounded-lg p-6",
                  fleetField[car.field],
                  i === 0 && "min-h-[360px] lg:col-span-7",
                  i === 1 && "lg:col-span-5",
                  i === 2 && "lg:col-span-4",
                  i === 3 && "lg:col-span-4",
                  i === 4 && "lg:col-span-4",
                )}
              >
                <div>
                  <h3 className="h3">{car.name}</h3>
                  <p className="mt-2 text-base opacity-80">{car.copy}</p>
                </div>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={480}
                  height={280}
                  className="mx-auto mt-6 h-40 w-auto object-contain"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="bg-white">
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-0 lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image
              src="/media/checkin.jpg"
              alt="Online check-in on a phone before pickup"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-navy px-6 py-16 text-white sm:px-12 lg:px-16">
            <p className="caption text-gold">Online check-in</p>
            <h2 className="h1 mt-3">Reduce time at the counter</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-ice">
              At Avance, we’re always trying hard to make your car rental experience as smooth and quick as possible. Check in before pickup or on the go.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`${liveSite}/online-checkin`}>
                  Start check-in
                  <Clock size={18} />
                </a>
              </Button>
              <Button asChild variant="inverse">
                <a href={`${liveSite}/locations`}>
                  All locations
                  <AirplaneTakeoff size={18} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="b2b" className="bg-wash">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="caption text-sky">Corporate, hotels, agencies</p>
            <h2 className="h1 mt-3 text-navy">B2B program, low rates, no hidden fees</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              It’s easy to enjoy valuable savings, exclusive service and great benefits all at no additional cost to your business. Get familiar with the Avance B2B program and join today.
            </p>
            <Button asChild className="mt-8" variant="navy">
              <a href={`${liveSite}/b2b`}>
                Join B2B
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>
          <aside className="rounded-lg bg-gold px-8 py-10 text-ink lg:col-span-7">
            <p className="caption">Long term rental</p>
            <p className="h3 mt-3">For rentals over 30 days</p>
            <p className="mt-4 max-w-lg text-base leading-7">
              Contact our reservation department at{" "}
              <a href={phoneHref} className="font-semibold">
                {phoneDisplay}
              </a>{" "}
              or by email at{" "}
              <a href={`mailto:${longTermEmail}`} className="font-semibold">
                {longTermEmail}
              </a>
              .
            </p>
            <ul className="mt-8 grid gap-3 text-base sm:grid-cols-2">
              <li>Low rates and special deals</li>
              <li>Personal account service</li>
              <li>Manage your reservation</li>
              <li>No hidden fees</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="faq" className="bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="caption text-sky">Rent a car FAQs</p>
            <h2 className="h1 mt-3 text-navy">Before you pick up the keys</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </div>
      </section>
    </main>
  );
}

function PlaceCard({
  dest,
  className,
  compact,
}: {
  dest: (typeof destinations)[number];
  className?: string;
  compact?: boolean;
}) {
  return (
    <article className={cn("relative overflow-hidden rounded-lg", className)}>
      <Image
        src={dest.image}
        alt={`${dest.name}, ${dest.place}`}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
        <h3 className={compact ? "text-xl font-semibold" : "h3"}>{dest.name}</h3>
        <p className="mt-1 text-sm text-white/85">{dest.place}</p>
        <p className="mt-2 font-semibold text-gold">{dest.price}</p>
      </div>
    </article>
  );
}
