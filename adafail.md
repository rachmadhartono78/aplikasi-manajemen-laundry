Build Error

Ecmascript file had an error
./booking-chekin/src/actions/auth.ts (3:1)

Ecmascript file had an error
1 | "use client"; // Note: This will be changed to "use server" when I use it in a real server action file, but for now I'm just creating the file structure. Wait, Server Actions MUST have "use server".
2 |

> 3 | "use server";

    | ^^^^^^^^^^^^^

4 |
5 | import prisma from "@/lib/prisma";
6 | import { redirect } from "next/navigation";

It's not possible to have both "use client" and "use server" directives in the same file.

Import traces:
Client Component Browser:
./booking-chekin/src/actions/auth.ts [Client Component Browser]
./booking-chekin/src/actions/auth.ts [Server Component]

Client Component SSR:
./booking-chekin/src/actions/auth.ts [Client Component SSR]
./booking-chekin/src/actions/auth.ts [Server Component]
