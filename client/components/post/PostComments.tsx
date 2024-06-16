import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const mockComment1: string =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor, consectetur pariatur veritatis vel nobis minus inventore? Nesciunt at ipsam beatae aliquam quod, earum officia, incidunt magni, repellat in corrupti unde sit.";
const mockComment2: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat atque omnis exercitationem repellat officiis voluptates quis qui quam praesentium, aut voluptatem illo nihil eligendi! Facere iusto cupiditate odio debitis? Neque ratione sed voluptatum dolore, exercitationem veniam sunt id fuga similique, sit aut consectetur earum porro ducimus cum excepturi repellendus, recusandae ut natus!";
const mockComment3: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit";
const PostComments = () => {
  return (
    <section className="w-full h-full p-4">
      <div className="">
        <Comment user={"User1"} comment={mockComment1} />
        <Comment user={"User2"} comment={mockComment2} />
        <Comment user={"User3"} comment={mockComment3} />
      </div>
    </section>
  );
};

interface CommentProps {
  comment: String;
  user: String;
  isChild?: true | undefined;
}

const Comment = (props: CommentProps) => {
  //todo: Incorporate Actual Comment Objects
  //todo: Add Functionality
  //todo: Add an Expand Option to Lengthy Comments

  return (
    <div className="flex">
      {props.isChild && <div></div>}
      <div>
        <div className="flex space-x-2 my-2">
          <Avatar className="w-7 h-7">
            <AvatarImage
              className="object-cover"
              src={process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
            />
            <AvatarFallback>JT</AvatarFallback>
          </Avatar>
          <span>{props.user}</span>
          <span>• 2d ago</span>
        </div>
        <div className="border-b-2">{props.comment}</div>
      </div>
    </div>
  );
};

export default PostComments;
