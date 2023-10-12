

interface EstimatedReadingTimeProps {
    articleText: string;
}

function EstimatedReadingTime({ articleText }: EstimatedReadingTimeProps) {

    function countWords(text: string): number {
        const words = text.split(/\s+/);
        return words.length;
    }

    const averageReadingSpeed: number = 200; // Tốc độ đọc trung bình (từ/phút)
    const estimatedReadingTime: number = Math.ceil(countWords(articleText) / averageReadingSpeed);
    return (

        <li className="list-inline-item"> {estimatedReadingTime} phút</li>

    );
}

export default EstimatedReadingTime;
