const colorClass = {
  "Auto": "currentColor",
  "Green": "#4DB848",
  "White": "#ffffff",
};

export default function PoweredByAgenciaEPlus({
  color = "Auto",
  width = 130,
}: {
  color?: keyof typeof colorClass;
  width?: number;
}) {
  return (
    <div style={{ width: width + "px", height: width / 5.4 + "px" }}>
      <a
        href="https://www.agenciaeplus.com.br/"
        target="_blank"
        aria-label="Powered by agenciaeplus.com.br"
        style={{ display: "flex" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={109}
          height={20}
          fill="none"
          style={{
            width: "auto",
            height: "auto",
          }}
        >
          <g clipPath="url(#a)" fill={colorClass[color]}>
            <path d="M10.024 15.448l4.449-2.562V7.794l-4.449 2.561v5.093zm3.889-8.657L9.418 4.214l-4.433 2.53 4.433 2.593 4.495-2.546z" />
            <path d="M.708 5v10l8.71 5 8.725-5V5L9.418 0 .708 5zM15.08 6.127l.545.324v7.13l-5.6 3.194-.59.34-6.175-3.566V6.451L9.465 2.9l5.614 3.226z" />
            <path d="M8.858 10.324L4.426 7.762v5.155l4.432 2.561v-5.154zm85.417-6.822H92.58v9.044h1.695V3.502zm6.143 5.65c0 1.05-.73 1.93-1.773 1.93-1.104 0-1.68-.803-1.68-1.837v-3.58h-1.71v3.61c0 2.115 1.198 3.365 2.862 3.365.98 0 1.633-.324 2.348-1.019l.109.926h1.54V5.664h-1.696v3.488zm5.646-.849c-.886-.046-1.291-.308-1.291-.74s.451-.68 1.26-.68c.669 0 1.229.14 1.711.603l.98-1.127c-.793-.694-1.618-.895-2.691-.895-1.26 0-2.924.556-2.924 2.145 0 1.559 1.556 2.037 2.862 2.13.98.061 1.369.247 1.369.725s-.623.833-1.26.818c-.762-.015-1.898-.417-2.38-.957l-.84 1.204c.996 1.05 2.1 1.234 3.189 1.234 1.975 0 2.97-1.034 2.97-2.253 0-1.836-1.664-2.13-2.955-2.207zM26.868 6.62c-.388-.694-1.29-1.126-2.208-1.126-2.022-.016-3.608 1.219-3.608 3.58 0 2.407 1.508 3.673 3.561 3.657.762-.015 1.851-.4 2.24-1.203l.078 1.003h1.617l.016-6.867h-1.649l-.047.956zM24.8 11.173c-1.151 0-2.053-.787-2.053-2.099 0-1.312.933-2.068 2.053-2.068 2.69.016 2.69 4.167 0 4.167zm10.53-6.189l-.654.865c-.482-.325-1.042-.386-1.586-.386-1.944 0-3.515 1.327-3.515 3.472s1.337 3.457 3.499 3.457c.871 0 1.758.447 1.758 1.389 0 .941-.763 1.466-1.758 1.466s-1.82-.602-1.82-1.482H29.56c0 1.852 1.493 3.071 3.5 3.071s3.468-1.157 3.468-3.055c0-.865-.28-1.698-1.431-2.269 1.135-.51 1.462-1.713 1.462-2.562a3.038 3.038 0 00-.731-2.037l.762-.972-1.26-.957zm-2.287 5.865c-.995 0-1.804-.726-1.804-1.914s.809-1.929 1.804-1.944c.995-.016 1.804.756 1.804 1.944s-.809 1.914-1.804 1.914zm8.305-7.022l.81.818h1.741v-.078L41.83 2.638h-.933l-2.084 1.93v.077h1.727l.808-.818zm8.321 1.9c-.855 0-1.57.339-2.27 1.018l-.11-1.127h-1.54l-.015 7.068h1.695V9.183c0-1.05.731-1.929 1.773-1.929 1.105 0 1.68.803 1.68 1.837v3.61h1.711V9.107c0-2.16-1.29-3.38-2.924-3.38zm7.559 5.447c-1.073 0-1.96-.695-1.96-2.006 0-1.204.84-2.037 1.991-2.037a2.117 2.117 0 011.4.54l1.089-1.127c-.778-.74-1.51-.926-2.489-.926-2.006 0-3.702 1.096-3.702 3.534 0 2.439 1.664 3.642 3.67 3.642a3.544 3.544 0 002.66-1.08l-1.135-1.111a2.058 2.058 0 01-1.524.571zm3.624 1.559h1.71l.032-7.1-1.711-.015-.031 7.115zm8.507-6.19c-.389-.694-1.29-1.126-2.208-1.126-2.022-.016-3.609 1.219-3.609 3.58 0 2.407 1.509 3.673 3.562 3.657.762-.015 1.85-.4 2.24-1.203l.077 1.018h1.618l.015-6.867h-1.648l-.047.941zm-2.068 4.583c-1.151 0-2.054-.786-2.054-2.098 0-1.312.918-2.068 2.054-2.068 2.706.015 2.69 4.167 0 4.167zm-4.573-7.7h-1.975v1.759h1.975v-1.76zm14.06 2.13c-2.24-.015-3.733 1.343-3.733 3.442 0 2.206 1.416 3.672 3.795 3.672 1.042 0 2.24-.37 2.97-1.11l-.761-.88c-.39.4-1.229.632-1.851.632-1.213 0-2.13-.648-2.24-1.497l5.397.047c.265-2.824-1.26-4.306-3.577-4.306zm-1.96 2.778c.12-.42.379-.787.734-1.045.355-.257.786-.389 1.226-.375.995 0 1.68.54 1.789 1.42h-3.749zm-33.64-2.686c-2.24-.015-3.734 1.343-3.734 3.442 0 2.206 1.416 3.672 3.795 3.672 1.042 0 2.24-.37 2.97-1.11l-.761-.88c-.389.4-1.229.632-1.851.632-1.213 0-2.13-.648-2.24-1.497l5.397.047c.265-2.824-1.275-4.306-3.577-4.306zm-1.945 2.763c.12-.42.378-.788.733-1.045.355-.257.787-.39 1.227-.375.995 0 1.68.54 1.788 1.42h-3.748zm49.163-5.016h-4.448v1.806h4.448c.404 0 1.695.216 1.695 1.404S88.894 8.18 88.894 8.18l-.016 1.79s2.986-.216 2.986-3.472-3.468-3.102-3.468-3.102zm-4.448 4.83h-2.8V10h2.8V8.226z" />
            <path d="M85.643 5.756h-1.695v2.47h1.695V10h-1.695v2.655h1.695V10h2.69V8.225h-2.69V5.756z" />
          </g>
          <defs>
            <clipPath id="a">
              <path
                fill={colorClass[color]}
                transform="translate(.6)"
                d="M0 0h108.311v20H0z"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  );
}
