# Data Model: Physical AI Book

## Chapter Entity
- **id**: string (unique identifier, e.g., "intro-to-physical-ai")
- **title**: string (display title of the chapter)
- **overview**: string (brief description of the chapter content)
- **learningObjectives**: array of strings (2-4 measurable learning outcomes)
- **contentOutline**: array of topic objects (structured breakdown of topics)
- **handsOnExercises**: array of exercise objects (practical activities)
- **resources**: array of resource objects (external links and references)
- **prerequisites**: array of chapter IDs (what should be read before this chapter)
- **difficulty**: enum ("beginner", "intermediate", "advanced")
- **estimatedTime**: number (estimated reading and exercise time in minutes)

## Topic Entity
- **id**: string (unique identifier within chapter)
- **title**: string (topic title)
- **content**: string (main content in MDX format)
- **examples**: array of example objects (code examples, diagrams, etc.)
- **exercises**: array of exercise IDs (references to handsOnExercises)

## Exercise Entity
- **id**: string (unique identifier within chapter)
- **title**: string (exercise title)
- **description**: string (detailed description of the exercise)
- **difficulty**: enum ("beginner", "intermediate", "advanced")
- **codeExample**: string (executable code example in Python/JS/C++)
- **expectedOutcome**: string (what the reader should achieve)
- **hints**: array of strings (helpful tips for completing the exercise)
- **solution**: string (complete solution for reference)

## Resource Entity
- **id**: string (unique identifier)
- **title**: string (resource title)
- **url**: string (URL to the resource)
- **type**: enum ("tutorial", "paper", "tool", "reference", "video", "code-sample")
- **description**: string (brief description of the resource)
- **relevance**: string (how this resource relates to the chapter content)

## Example Entity
- **id**: string (unique identifier within topic)
- **title**: string (example title)
- **description**: string (brief explanation of what the example demonstrates)
- **code**: string (executable code in appropriate language)
- **language**: enum ("python", "javascript", "cpp", "other")
- **expectedOutput**: string (what output or behavior to expect)
- **explanation**: string (detailed explanation of the code)

## User Progress Entity
- **userId**: string (anonymous identifier for tracking progress)
- **chapterId**: string (chapter being tracked)
- **completedTopics**: array of topic IDs (topics the user has completed)
- **completedExercises**: array of exercise IDs (exercises the user has completed)
- **timeSpent**: number (time spent on this chapter in minutes)
- **lastAccessed**: date (when the user last accessed this content)

## Validation Rules

### Chapter Validation
- Title must be 5-100 characters
- Overview must be 20-200 characters
- Must have 2-4 learning objectives
- Learning objectives must be measurable and specific
- Content outline must have at least 2 topics
- Prerequisites must reference existing chapters
- Difficulty must be one of the allowed values

### Exercise Validation
- Title must be 5-100 characters
- Description must be at least 20 characters
- Difficulty must be one of the allowed values
- Code example must be valid for the specified language
- Expected outcome must be clearly defined

### Resource Validation
- Title must be 5-100 characters
- URL must be a valid URL format
- Type must be one of the allowed values
- Description must be at least 10 characters

### Example Validation
- Title must be 5-100 characters
- Code must be valid for the specified language
- Expected output must be provided
- Explanation must be at least 20 characters

## State Transitions

### Chapter States
- **draft**: Initial state, content is being created
- **review**: Content is under review by team members
- **published**: Content is available to readers
- **deprecated**: Content is outdated but still accessible

### User Progress States
- **not-started**: User hasn't begun the chapter
- **in-progress**: User has started but not completed
- **completed**: User has finished all topics and exercises
- **reviewed**: User has reviewed the content after completion