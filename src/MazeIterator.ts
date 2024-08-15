export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}

//Recursion at play
function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[]
): boolean {
  //Base Cases:
  //off the map
  if (
    curr.x >= maze[0].length ||
    curr.x < 0 ||
    curr.y >= maze[1].length ||
    curr.y < 0
  ) {
    return false;
  }

  // hit a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // finds ending
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }

  // hits the previous taken path
  if (seen[curr.y][curr.x]) {
    return false;
  }

  // pre recurse
  seen[curr.y][curr.x] = true;
  path.push(curr);

  for (let i = 0; i < dir.length; i++) {
    const [x, y] = dir[i];
    if (
      walk(
        maze,
        wall,
        {
          x: curr.x + x,
          y: curr.y + y,
        },
        end,
        seen,
        path
      )
    ) {
      return true;
    }
  }

  // post recurse
  path.pop();

  return false;
}

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

type Point = {
  x: number;
  y: number;
};
