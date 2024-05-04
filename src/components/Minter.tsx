"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import abi from "@/abi.json"
import { useEffect } from "react";

const formSchema = z.object({
  mintString: z.string().min(1, {
    message: "Please specify Raza's love!",
  }),
});

//@ts-ignore
export default function MinterForm({ handleConnect }) {

  const { writeContract, data:hash } = useWriteContract()

  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  //@ts-ignore
  const onSubmit = (data) => {
    console.log(data);
    writeContract({
      abi,
      address: "0x322B5D3fa72681DDda58674A0B1f5Ff37f51425b",
      functionName: "mint",
      args: [
        data.mintString
      ]
    })
  };

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Transaction Pending");
    }
    toast.dismiss();

    if (isConfirmed) {
      toast.success("Transaction Successful", {
        action: {
          label: "View on ScrollScan",
          onClick: () => {
            window.open(`https://scrollscan.com/tx/${hash}`);
          },
        },
      });
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirming, isConfirmed, error, hash]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mintString"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What or Who does Raza Love?</FormLabel>
              <FormControl>
                <Input placeholder="Enter your answer and mint..." {...field} />
              </FormControl>
              <FormDescription>
                Enter your Answer and mint your onchain NFT
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-5">
          <Button type="submit">Mint</Button>
          <Button onClick={handleConnect}>Wallet Info</Button>
        </div>
      </form>
    </Form>
  );
}
