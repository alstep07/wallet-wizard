import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  if (!process.env.ZERION_API_KEY) {
    return NextResponse.json(
      { error: "Zerion API key is not configured" },
      { status: 500 },
    );
  }

  try {
    // Format the API key according to Zerion's requirements
    const encodedKey = Buffer.from(`${process.env.ZERION_API_KEY}:`).toString(
      "base64",
    );

    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/positions/?currency=usd&filter=assets`,
      {
        headers: {
          Authorization: `Basic ${encodedKey}`,
          Accept: "application/json",
        },
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Zerion API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: JSON.stringify(responseData, null, 2),
      });

      return NextResponse.json(
        {
          error: "Failed to fetch data from Zerion",
          details: responseData,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch token data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
