import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { COUNTRIES, PHONE_FORMAT, PINNED, flagOf } from "@/lib/countries";

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

interface Props {
  name: string;
  language: "fr" | "en";
  defaultIso: string;
  labels: { trigger: string; search: string; empty: string; pinned: string; all: string };
  onSelect?: (iso: string) => void;
}

// Searchable country code picker: "fr", "France", "maroc" or "33" all find the right code.
// The chosen code is submitted through a hidden input named `name`, e.g. "+33".
export function DialCodePicker({ name, language, defaultIso, labels, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [iso, setIso] = useState(defaultIso);
  const countries = useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames([language], { type: "region" });
    } catch {
      // Very old browsers: fall back to the ISO code as the name.
    }
    return COUNTRIES.map(([code, dial]) => ({
      iso: code,
      dial,
      name: names?.of(code) ?? code,
    })).sort((a, b) => a.name.localeCompare(b.name, language));
  }, [language]);
  const current = countries.find((x) => x.iso === iso) ?? countries[0]!;

  const results = useMemo(() => {
    const q = fold(query.trim().replace(/^\+/, ""));
    if (!q) return null;
    const rank = (x: (typeof countries)[number]) => {
      const n = fold(x.name);
      if (x.iso.toLowerCase() === q) return 0;
      if (/^\d+$/.test(q) && x.dial === q) return 1;
      if (n.startsWith(q)) return 2;
      if (/^\d+$/.test(q) && x.dial.startsWith(q)) return 3;
      if (n.includes(q)) return 4;
      return -1;
    };
    return countries
      .map((x) => ({ x, r: rank(x) }))
      .filter(({ r }) => r >= 0)
      .sort((a, b) => a.r - b.r)
      .map(({ x }) => x);
  }, [countries, query]);

  const pinned = PINNED.map((p) => countries.find((x) => x.iso === p)!).filter(Boolean);
  const choose = (code: string) => {
    setIso(code);
    setOpen(false);
    setQuery("");
    onSelect?.(code);
  };
  const row = (x: (typeof countries)[number]) => (
    <CommandItem key={x.iso} value={x.iso} onSelect={() => choose(x.iso)} className="dial-option">
      <span className="dial-flag" aria-hidden="true">
        {flagOf(x.iso)}
      </span>
      <span className="dial-name">{x.name}</span>
      <span className="dial-code">+{x.dial}</span>
    </CommandItem>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={`+${current.dial}`} />
      <PopoverTrigger asChild>
        <button
          type="button"
          className="dial-trigger"
          aria-label={`${labels.trigger}: ${current.name} +${current.dial}`}
        >
          <span aria-hidden="true">{flagOf(current.iso)}</span>
          <span>+{current.dial}</span>
          <ChevronDown aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="dial-popover">
        <Command shouldFilter={false}>
          <CommandInput value={query} onValueChange={setQuery} placeholder={labels.search} />
          <CommandList>
            <CommandEmpty>{labels.empty}</CommandEmpty>
            {results ? (
              <CommandGroup>{results.map(row)}</CommandGroup>
            ) : (
              <>
                <CommandGroup heading={labels.pinned}>{pinned.map(row)}</CommandGroup>
                <CommandGroup heading={labels.all}>{countries.map(row)}</CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
