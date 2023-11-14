import "./topBox.scss";
import { topDealUsers } from "../../data";
const TopBox = () => {
    return (
        <div className="topBox">
            <h1>Top Ranking</h1>
            <div className="list">
                {topDealUsers.map((user) => (
                    <div className="listItem" key={user.id}>
                        <div className="user">
                            <img src={user.img} alt="" />
                            <div className="userTexts">
                                <span className="username">
                                    {user.username}
                                </span>
                                <span className="email">{user.email}</span>
                            </div>
                        </div>
                        <div className="contributes">

                            <span className="votes">Vote:
                                {user.votes}</span>
                            <span className="posts">Posts:{user.posts}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopBox;
