"use client";

import { useRef, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/hooks/use-search-param";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useSearchParams("search");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
      />

      {/* Input Field */}
      <form onSubmit={handleFormSubmit}>
        <Input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="pl-10 pr-10"
        />
      </form>

      {/* Clear Button */}
      {search && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => {
            setSearch("");
            inputRef.current?.blur();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
