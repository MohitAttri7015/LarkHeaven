import { useEffect } from "react";

function PageTitle({ title }) {
    useEffect(() => {
        document.title = `ByteForge — ${title}`;
    }, [title]);

    return null;
}

export default PageTitle;