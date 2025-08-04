const HabitList = ({ habits }) => {
  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit._id}>
          <strong>{habit.habitName}</strong> - {habit.type} - {new Date(habit.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
