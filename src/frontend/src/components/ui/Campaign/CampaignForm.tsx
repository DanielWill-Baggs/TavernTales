"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { use, useEffect, useState } from "react";

const formSchema = z.object({
  userInputs: z.object({
    setting: z.string().min(1, { message: "Setting is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    theme: z.string().min(1, { message: "Theme is required." }),
    tone: z.string().min(1, { message: "Tone is required." }),
    party_composition: z
      .string()
      .min(1, { message: "Party composition is required." }),
    length: z.string().min(1, { message: "Length is required." }),
    preferences: z.string().min(1, { message: "Preferences are required." }),
  }),
});

export function CampaignForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInputs: {
        setting: "",
        location: "",
        theme: "",
        tone: "",
        party_composition: "",
        length: "",
        preferences: "",
      } as z.infer<typeof formSchema>["userInputs"],
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:3001/one-shot-campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInputs: {
            setting: values.userInputs.setting,
            location: values.userInputs.location,
            theme: values.userInputs.theme,
            tone: values.userInputs.tone,
            party_composition: values.userInputs.party_composition,
            length: values.userInputs.length,
            player_preferences: values.userInputs.preferences,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Successfully submitted:", data);

      const secondResponse = await fetch(
        "http://localhost:3001/generate-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageType: "Campaign",
            campaignId: data.id,
            campaign_title: data.campaign_title,
            setting: data.setting,
            setting_details: data.setting_details,
            tone: data.tone,
            theme: data.theme,
            location: data.location,
            party_composition: data.party_composition,
            introduction: data.introduction,
            ending: data.ending,
            rewards: data.rewards
              ? data.rewards.map((reward: string) => reward.toString())
              : [],
          }),
        }
      );

      if (!secondResponse.ok) {
        throw new Error("Error generating image");
      }

      const imageData = await secondResponse.json();
      console.log("Image generated:", imageData);

      setMessage("Campaign successfully created, and image generated!");
      setErrorMessage(null);
      form.reset();
    } catch (error) {
      console.error("Error:", error);

      setMessage(null);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Setting Field */}
            <FormField
              control={form.control}
              name="userInputs.setting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setting</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter a setting (e.g., dark fantasy)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="userInputs.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter a location (e.g., a castle)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Theme Field */}
            <FormField
              control={form.control}
              name="userInputs.theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter a theme (e.g., exploration)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tone Field */}
            <FormField
              control={form.control}
              name="userInputs.tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter a tone (e.g., heroic)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Party Composition Field */}
            <FormField
              control={form.control}
              name="userInputs.party_composition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Party Composition</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter party composition (e.g., balanced)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Length Field */}
            <FormField
              control={form.control}
              name="userInputs.length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter session length (e.g., 2-3 hours)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preferences Field */}
            <FormField
              control={form.control}
              name="userInputs.preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferences</FormLabel>
                  <FormControl>
                    <Input
                      className=" text-gray-900 border-none bg-[#ffffff] rounded-md font-sans"
                      placeholder="Enter preferences (e.g., storytelling)"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded  transform transition-all hover:scale-105 "
          >
            Submit
          </Button>
        </form>
      </Form>
      {message && <div className="p-10">{message}</div>}
      {errorMessage && <div className="p-10">{errorMessage}</div>}
    </div>
  );
}
