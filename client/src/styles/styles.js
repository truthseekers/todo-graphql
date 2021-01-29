import { makeStyles } from "@material-ui/core/styles";

const useHeaderStyles = makeStyles((theme) => ({
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

const useUnauthenticatedStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

export { useHeaderStyles, useUnauthenticatedStyles };
