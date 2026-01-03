import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryEmailRequest {
  full_name: string;
  email: string;
  mobile_number: string;
  company_name: string;
  role_designation: string;
  industry: string;
  years_in_business: number;
  website_or_linkedin?: string;
  business_description: string;
  business_stage: string;
  reason_to_join: string;
  expected_gain: string;
  contribution_to_community: string;
  membership_type: string;
  participate_in_events: boolean;
  understands_curation: boolean;
  ibc_stories_interest?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-inquiry-email function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: InquiryEmailRequest = await req.json();
    console.log("Received inquiry data for:", data.full_name);

    const emailHtml = `
      <h1>New IBC Membership Inquiry</h1>
      
      <h2>Personal & Business Details</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.full_name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.mobile_number}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company_name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Role</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.role_designation}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Industry</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.industry}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Years in Business</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.years_in_business}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Website/LinkedIn</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.website_or_linkedin || 'N/A'}</td></tr>
      </table>

      <h2>Business Overview</h2>
      <p><strong>Description:</strong> ${data.business_description}</p>
      <p><strong>Stage:</strong> ${data.business_stage}</p>

      <h2>Community Fit</h2>
      <p><strong>Reason to Join:</strong> ${data.reason_to_join}</p>
      <p><strong>Expected Gain:</strong> ${data.expected_gain}</p>
      <p><strong>Contribution:</strong> ${data.contribution_to_community}</p>

      <h2>Membership</h2>
      <p><strong>Type:</strong> ${data.membership_type}</p>

      <h2>Engagement</h2>
      <p><strong>Participate in Events:</strong> ${data.participate_in_events ? 'Yes' : 'No'}</p>
      <p><strong>Understands Curation:</strong> ${data.understands_curation ? 'Yes' : 'No'}</p>
      <p><strong>IBC Stories Interest:</strong> ${data.ibc_stories_interest || 'Not specified'}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IBC Membership <onboarding@resend.dev>",
        to: ["vitalizepay@gmail.com"],
        subject: `New IBC Membership Inquiry from ${data.full_name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending inquiry email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
