<scoreboard>
    <table>
        <thead>
            <tr>
                <th>Guild</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <tr each={riot.scoreboard}>    
                <td data-label="Guild">{name}</td>
                <td data-label="High Score">{points}</td>
            </tr>
        </tbody>
    </table>
</scoreboard>