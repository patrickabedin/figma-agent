"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { liveSite, locations } from "@/lib/data";

function isoDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function BookingCard() {
  const defaults = useMemo(
    () => ({ pickup: isoDate(1), dropoff: isoDate(8) }),
    [],
  );
  const [differentDrop, setDifferentDrop] = useState(false);

  return (
    <form
      id="book"
      action={liveSite}
      method="get"
      className="rounded-lg bg-white p-6 shadow-[0_16px_40px_rgba(0,48,97,0.12)] sm:p-8"
    >
      <p className="caption text-sky">Airport and island pickup</p>
      <h2 className="h3 mt-2 text-navy">Make a booking</h2>
      <p className="mt-2 text-base text-muted-foreground">
        Check, click, pay, start your journey to Greek Summer.
      </p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="pickup-location">Pickup location</Label>
          <select
            id="pickup-location"
            name="pickup"
            required
            defaultValue="Athens International Airport"
            className="field"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            className="size-4 accent-navy"
            checked={differentDrop}
            onChange={(e) => setDifferentDrop(e.target.checked)}
          />
          Different drop-off
        </label>

        {differentDrop ? (
          <div className="grid gap-2">
            <Label htmlFor="dropoff-location">Drop-off location</Label>
            <select
              id="dropoff-location"
              name="dropoff"
              className="field"
              defaultValue="Athens International Airport"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="pickup-date">Pickup date</Label>
            <Input
              id="pickup-date"
              name="from"
              type="date"
              defaultValue={defaults.pickup}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dropoff-date">Drop-off date</Label>
            <Input
              id="dropoff-date"
              name="to"
              type="date"
              defaultValue={defaults.dropoff}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="discount">Discount code</Label>
          <Input id="discount" name="code" type="text" autoComplete="off" />
        </div>
      </div>

      <Button type="submit" className="mt-6 w-full" size="lg">
        Book now
        <ArrowRight size={18} weight="bold" />
      </Button>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <a href={`${liveSite}/manage-reservation`} className="text-sky underline-offset-4 hover:underline">
          Manage reservation
        </a>
        <a href={`${liveSite}/online-checkin`} className="text-sky underline-offset-4 hover:underline">
          Online check-in
        </a>
        <a href={`${liveSite}/b2b`} className="text-sky underline-offset-4 hover:underline">
          B2B login
        </a>
      </div>
    </form>
  );
}
