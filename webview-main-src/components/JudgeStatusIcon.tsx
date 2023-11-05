import {
  SubmissionStatus,
  getClassNameFromSubmissionStatus,
  getShortStatusNameFromSubmissionStatus,
} from "../../public-src/util/JudgeInfoUtil";

type Props = {
  submissionStatus: SubmissionStatus;
};

const JudgeStatusIcon: React.FC<Props> = (props: Props) => {
  const { submissionStatus } = props;

  return (
    <p
      className={`
        ${getClassNameFromSubmissionStatus(submissionStatus)}
        text-white
        text-xs
        w-6
        h-6
        rounded
        flex
        items-center
        justify-center
        dark:text-darkMode-text`}
    >
      {getShortStatusNameFromSubmissionStatus(submissionStatus)}
    </p>
  );
};

export default JudgeStatusIcon;
