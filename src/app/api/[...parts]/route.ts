import { apiConfig, router } from "@/lib/api/api-config.type";
import { processQuery } from "@/lib/api/process-query";

export async function GET(request: Request, { params }: { params: Promise<{parts: string[]}>}) {
    const { parts } = await params;

    return processQuery(router, request, parts)
}

export async function POST(request: Request, { params }: { params: Promise<{parts: string[]}>}) {
    const { parts } = await params;

    return processQuery(router, request, parts)
}

export async function PUT(request: Request, { params }: { params: Promise<{parts: string[]}>}) {
   const { parts } = await params;

    return processQuery(router, request, parts)
}

export async function PATCH(request: Request, { params }: { params: Promise<{parts: string[]}>}) {
    const { parts } = await params;

    return processQuery(router, request, parts)}

export async function DELETE(request: Request, { params }: { params: Promise<{parts: string[]}>}) {
    const { parts } = await params;

    return processQuery(router, request, parts)
}