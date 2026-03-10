import { useState, useEffect } from "react";
import axios from "axios";
import { InterviewReport } from "@/types/interview";

export function useInterviewReport(id: string) {
    const [report, setReport] = useState<InterviewReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                const cleanBaseUrl = baseUrl?.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
                const { data } = await axios.get(
                    `${cleanBaseUrl}/interview/report/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        withCredentials: true,
                    }
                );
                setReport(data.interviewReport ?? data.data ?? data);
            } catch (err: unknown) {
                setError("Failed to load your interview report. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    return { report, loading, error };
}
