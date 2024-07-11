
import Person from "../Components/Person";

export default function About() {
    return (
        <>
            <h1>Hakkımızda</h1>
            <div>
                {Person.map(person => (
                    <div 
                        key={person.id}
                        style={{ 
                            marginTop: "15px", 
                            color: "black", 
                            backgroundColor: "#e3f2fd", 
                            borderRadius: '15px', 
                            border: '0px solid #ccc', 
                            padding: '20px' 
                        }} 
                        className="container"
                    >
                        <h3>{person.Name}</h3>
                        <p>{person.School}</p>
                        <p>{person.Job}</p>
                        <a href={person.Contact} target="_blank" rel="noopener noreferrer">İletişim</a>
                    </div>
                ))}
            </div>
            <br />
            <br />
        </>
    );
}
