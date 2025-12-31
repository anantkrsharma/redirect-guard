import { useEffect, useState } from "react";
import "./theme.css";

export default function App() {
    const [links, setLinks] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId !== undefined) {
            chrome.storage.local.get(`links_${tabId}`, (result) => {
            setLinks((result[`links_${tabId}`] as string[]) || []);
            setLoading(false);
            });
        }
        });
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2>Suspicious Links</h2>
            </header>

            {isLoading ? (
                <p style={styles.message}>Loading…</p>
            ) : links.length === 0 ? (
                <p style={styles.message}>No suspicious links found</p>
            ) : (
                <ul style={styles.list}>
                {links.map((href, i) => (
                    <li key={i} style={styles.item}>
                    <a href={href} target="_blank" style={styles.link}>
                        {href}
                    </a>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "12px",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
    } as React.CSSProperties,
    header: {
        borderBottom: "2px solid var(--border)",
        marginBottom: "8px",
        textAlign: "center",
    } as React.CSSProperties,
    message: {
        textAlign: "center",
        color: "var(--muted-foreground)",
        paddingTop: "12px",
    } as React.CSSProperties,
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    } as React.CSSProperties,
    item: {
        background: "var(--card)",
        color: "var(--card-foreground)",
        padding: "8px",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        marginBottom: "6px",
    } as React.CSSProperties,
    link: {
        color: "var(--primary-foreground)",
        textDecoration: "none",
        fontSize: "14px",
        wordBreak: "break-word" as "break-word",
    } as React.CSSProperties,
};
