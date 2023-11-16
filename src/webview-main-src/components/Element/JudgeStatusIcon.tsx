import { SubmissionStatus } from "../../../public-src/constants/constant";
import {
  getClassNameFromSubmissionStatus,
  getShortStatusNameFromSubmissionStatus,
} from "../../../public-src/utils/JudgeInfoUtil";

type Props = {
  submissionStatus: SubmissionStatus;
};

/**
 * ジャッジステータスアイコン
 * @param props - props
 * @returns ジャッジステータスアイコン
 *
 * @remarks
 * 提出状況がAcceptedなら緑色のアイコン、それ以外なら赤色のアイコン
 */
const JudgeStatusIcon: React.FC<Props> = (props: Props) => {
  // propsから提出状況を取得
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
