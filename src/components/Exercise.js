import React from 'react';
import clsx from 'clsx';
import styles from './Exercise.module.css';


const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const difficultyClasses = {
  beginner: 'difficulty-beginner',
  intermediate: 'difficulty-intermediate',
  advanced: 'difficulty-advanced'
};

const Exercise = ({ title, difficulty, description, children, hints, solution }) => {
  const [showSolution, setShowSolution] = React.useState(false);
  const [showHints, setShowHints] = React.useState(false);

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <div className={clsx('exercise-box', styles.exerciseContainer)}>
      <div className="exercise-title">
        <span className="exercise-title">{title}</span>
        {difficulty && (
          <span className={clsx('badge', difficultyClasses[difficulty])}>
            {difficultyLabels[difficulty]}
          </span>
        )}
      </div>

      <div className={styles.exerciseContent}>
        {description && <p>{description}</p>}
        {children}
      </div>

      {hints && hints.length > 0 && (
        <div className={styles.hintsSection}>
          <button
            className={clsx('button button--sm', styles.hintButton)}
            onClick={toggleHints}
            type="button"
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
          {showHints && (
            <div className={styles.hintsContent}>
              <ul>
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {solution && (
        <div className={styles.solutionSection}>
          <button
            className={clsx('button button--sm button--secondary', styles.solutionButton)}
            onClick={toggleSolution}
            type="button"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div className={clsx('code-block-exercise', styles.solutionContent)}>
              <pre><code>{solution}</code></pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exercise;