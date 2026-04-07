import { Router, type IRouter, type Request, type Response } from "express";
import { db, shiftsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateShiftBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/shifts", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = CreateShiftBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid shift data" });
    return;
  }

  const { scenarioId, won, scoreEarned, timeSecs, ragePeak, managerUsed } = parsed.data;

  const [shift] = await db
    .insert(shiftsTable)
    .values({
      userId: req.user.id,
      scenarioId,
      won,
      scoreEarned,
      timeSecs,
      ragePeak,
      managerUsed,
    })
    .returning();

  res.status(201).json(shift);
});

router.get("/shifts", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const shifts = await db
    .select()
    .from(shiftsTable)
    .where(eq(shiftsTable.userId, req.user.id))
    .orderBy(shiftsTable.createdAt);

  res.json({ shifts });
});

export default router;
