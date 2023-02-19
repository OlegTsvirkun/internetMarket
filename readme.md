<h1 align='center'>Detailed description of possibilities of MyApple Store:</h1>
<p>This is an single page appliction develeped on React.js framework. It has its own server and DB.</p>
<p><b>Front-end </b>use ReduxToolkit, axios, react-router-dom features</p>
<p> <b>Back-end</b> developed on node.js with using express framework and Mongoose for connecting to MongoDB. </p>

<p>The application gives possiblity to order goods, with authentification and without it. Sending an email messages to
    user and manager after order. Manager has his own panel where he can handle orders and change statuses of them.
    Admin can correct goods information and add new items</p>
The structure of application:
<details>
    <summary>FRONT-END PAGES</summary>
    <ul>
        <li> <a href="#mainPage">Main page</a> </li>
        <li> <a href="#categoryPage">Category and search pages</a> </li>
        <li> <a href="#goodPage">Good page</a> </li>
        <li> <a href="#orderPage">Order page</a> </li>
        <li> <a href="#authPage">Authorization and registration pages</a> </li>
        <li> <a href="#cabinets">CABINETS</a> </li>
    </ul>
</details>
<details>
    <summary>REST BACK-END</summary>
    <ul>
        <li> <a href="#feRoutes">ROUTES</a> </li>
        <li> <a href="#feReq">DESCRIPTION OF REQUESTS</a> </li>
    </ul>
</details>

<details>
    <summary>REST BACK-END</summary>
    <ul>
        <li> <a href="#beControllers">Controllers</a> </li>
        <li> <a href="#beMiddleware">Middleware</a> </li>
    </ul>
</details>
<h2 id="'mainPage" align='center'>Main page</h2>
<p><b> Main page</b> displays all categories of goods. Each card of category has list of goods with reference to
    specific page
    of good.</p>
<p> <b>HEADER</b> has two parts:</p>
<ul>
    <li>
        The upper header contains logo and title of shop, which are the link to main page.
        <p>It also has buttons in right side. If user is not authorized, it has only one button-link to authorization
            page.</p>
        <p>
            If user authorized there are present additional buttons, which depend of authorization role:
        <ul>
            <li>USER - button. MENU(<b>user cabinet</b> and <b>user orders</b>)</li>
            <li>MANAGER - to manager's page.</li>
            <li>ADMIN - button-link to admin's page, </li>
        </ul>
        The
        athorization button changes to Exit button.
        </p>
    </li>
    <ul>
        <li> The <b>lower header</b> -SubHeader has left button with <b>catalog menu</b>: Each link is a reference to
            specific page.
        <li>
            <b>The search component </b>can
            find goods by request. It finds matches request and good's names in DB.
        </li>
        <li>
            <b>Sort button</b> exists only on <b>category page</b>
            or <b>search page</b>. It can sort by alphabet and price.
        </li>
        <li><b> Basket component</b> displays availability of goods in it andshows the total price. Clicking on it make
            a render of <b>modal window</b> with list of added goods. In this menu customer can change the count of
            products, or delete them. The button at the bottom move to the order page.</li>
        </li>
    </ul>
</ul>
<h2 id="categoryPage" align="center">Category page</h2>
<p><b>Category page</b> or <b>search page</b> have a list of <b>product's cards</b>. As default it dispalys 3 cards.
</p>
<p>In the right top coner under the SubHeader presents the <b>handler of count</b> displaying pages. At the bottom of
    component presents a <b>pagination</b>. They are depend each other. </p>

<p>Each <b>Good card</b> has a link to its own page, and present a brief information about good: name, picture, articul,
    price and button 'add to basket'.</p>
<p>Pressing on the button 'add to basket'/'В кошик' saves the product to the Redux store and Local storage.</p>
<p>After apllication had reloaded the Redux takes information from the local storage.</p>
<p>
    Also number of page,count, sorting, searching value, and category name that can be displaying depends on
    searchParams of link. The application use
<p>useSearchParams and useLocation from react-router-dom.</p>
</p>
<h2 align="center" id="goodPage">Good page </h2>
<p>
    Good page is a page of specific product. It displays full information about good with the ability to add it to the
    basket. Page has main picture of good, and additional images in <b>carousel component</b>. Clicking on additional
    image calls the modal window with larger scale.
</p>
<h2 align="center" id="orderPage">Order page </h2>

<p>
    At Order page customer fills the gaps with own information. If user logined and his contact information is presents,
    application automatically fills the gap with this information.
    The fields starred with red stars are required. All fields have rules and patterns of <b>validaion</b>. It is build
    on
    <b>react-hook-form</b>. It is unpossible finish the order without following of rules.
</p>
<p>
    After filling an email field, the application check is user with same value is present in system. If this is true,
    it asks a customer to login. The button will be disabled until errors are disappear. Each error appear like a red
    colored title under the field. At the page customer can control count of products. The order finished by the marking
    of
    checkbox and pressuring of button to end an order. After order had created on server, apllication move customer
    forward to <b> Finish Order page</b>, wich contains the information about number of order.
</p>
<p>Also the application automatically <b>sents an email message</b> about full order info.</p>

<h2 align="center" id="authPage">Authorization page </h2>

<p><b>User registration</b>: use unique email. Registering only one role USER.</p>
<p><b>Authorization</b>:</p>
<ul>
    <li> USER role renders button MENU on Header, which helps to move into the user cabinet. 
    </li>
    <li> ADMIN role renders button ADMIN PANEL on Header, which helps to move into the Admin's cabinet. 
    </li>
    <li> MANAGER role renders button ADMIN PANEL on Header, which helps to move into the managers's cabinet. 
    </li>
</ul>

<h2 align="center" id="cabinets">CABINETS </h2>


<ul>
    <li>
        In <b>USER cabinet</b> customer can fill his own contact info or chage it. Also user can review all information
        about his
        present and past orders.
    </li>
    <li>
        <b>ADMIN cabinet</b> allows admin to create or delete category or goods, or to modify good. Each panel has his
        own filling
        rules.
        <ul>
            <li><b>Create category</b>(name, picture and description)</li>
            <li><b>Create good</b>(name, articul, price, main picture, addition images and description) For new line
                character use '|' in the end of string in description.
            </li>
            <li>
                <b> Edit good.</b> To start modify good admin should find it by articul or name in the appropriate
                component.
                The list of
                finded goods displays only 10 items as default. In list admin can delete a product or move to edit it.
            </li>
        </ul>
    </li>
    <li>
        <b>MANAGER panel</b> allows manager to see the list of orders by its status. Every button has own color of
        status.
        By clicking on specific button application shows appropriate orders that manager can handle. In the the order manager can
        see all informatoin about order. After manager had contacted with client, he must chose new status in the select in
        right top coner under subHeader.
    </li>

</ul>



<h2 align="center" id="fe">Front-end part</h2>
<h3 align="center" id="feRoutes">ROUTES:</h3>
<h4>Public routes:</h4>
<ul>
    <li>/</li>
    <li>/cat/:id</li>
    <li>/good</li>
    <li>/search</li>
    <li>/search-articul</li>
    <li>/finish-order</li>
    <li>/user/isUser</li>
    <li>/user/login</li>
    <li>/user/registration</li>
    <li>/contacts/main-contacts</li>
    <li>/contacts/secondary-contacts</li>
</ul>

<h4> Rotes with authentification:</h4>
<ul>
    <li>/user/auth</li>
    <li>/user/info</li>
    <li>/user/cabinet/orders</li>
    <li>/user/change-configs</li>
</ul>

<h4>Rotes with ROLE authentification:</h4>

<h5>ADMIN role:</h5>
<ul>
    <li>/admin/create-good</li>
    <li>/admin/create-category</li>
    <li>/admin/update-good</li>
    <li>/admin/remove-image</li>
    <li>/admin/remove-good</li>
</ul>

<h5>MANAGER role:</h5>
<ul>
    <li>/manager/</li>
    <li>/manager/list</li>
    <li>/manager/order</li>
    <li>/manager/order/update-status</li>
</ul>



<h3 id="feReq"> DESCRIPTION OF REQUESTS</h3>
<p> (function request(data:type)/request type/auth?/createAsyncThunk?)</p>
<h4>middleware: src/axios.js</h4>
<ul>
    <li>host</li>
    <li>hostAuth,(middleware for authentification):
        <p> -hostAuth: interceptor header.authorization (Bearer token)</p>
    </li>
</ul>



<h3 align="center">APP:</h3>
check(),<b>'user/auth'</b>, type:GET, createAsyncThunk('CHECK_USER');

<h3 align="center">HEADER:</h3>
<h4>SubHeader:</h4> getMain(), <b>'/'</b>, type: GET, createAsyncThunk('GET_MAIN');

<h3 align="center">PAGES:</h3>
<h3 align="center">AdminPage <b>, '/admin'</b></h3>
<h4> Components:</h4>
<ul>
    <li>
        <h3>CreateCategory,</h3> 'admin/create-category'
<pre>
createCategory({
category: String, require:true,
description: String, require:true,
picture: image/File, require:true,
}),
</pre>
        <p>type POST, with auth ,createAsyncThunk('CREATE_CATEGORY')</p>
    </li>
    <li>
        <h3>CreateGood</h3>, 'admin/create-good'
<pre>
createNewGood({
name: String, require:true,
articul: Number, require:true,
price: Number, require:true,
category: String, require:true,
description: String, require:true,
picture: file/image, require:true,
images: [file/image], require:false,
}),
</pre>
        <p>type POST , with auth , createAsyncThunk('CREATE_GOOD')</p>
    </li>
    <li>
        <h3> EditGoodSearch</h3>, 'admin/edit',
        <ul>
            <li>
<pre>searchingGoods(`q=`)</pre>,
                '/search?q=', type GET ,createAsyncThunk('SEARCH_GOOD')
            </li>
            <li>
<pre>searchingGoodsByArticul(`articul=`)</pre>,
                '/search-articul?articul=' , type GET,
                createAsyncThunk('SEARCH_GOOD_BY_ARTICUL')
            </li>
        </ul>
    </li>
    <li>
        <h3> EditListGoods</h3>, 'admin/edit-list'
        <ul>
            <li>
<pre>
removeGood(id: String)
</pre>, 
        type POST, auth;
            </li>
        </ul>
    </li>
    <li>
        <h3>EditGoodComponent</h3>, 'admin/edit-good'
    </li>
    <li>
        <h3>EditGoodItem</h3>
        <ul>
            <li>
<pre>
removeImageData(imageData:String)
</pre>,
                '/admin/remove-image', type: POST, with auth;
            </li>
            <li>
<pre>
updateGood({
name:String,require:false,
category:String,require:false,
articul: Number,require:false,
price: Number,require:false,
description:String,require:false,
picture: file/image, require:false,
images: [file/image], require:false,
})
</pre>,
                '/admin/update-good', type POST , with auth;
            </li>
        </ul>
    </li>
</ul>

<h3 align="center">Auth Page: <b> '/admin'</b></h3>


<ul>
    <li>
        <h3>AuthComponent</h3>
<pre>
loginUser({
email: String, require:true,
password: String, require:true,
}),
</pre>,
        'user/login', type: POST, createAsyncThunk('LOGIN_USER');

<pre>
registerUser({
email: String, require:true,
password: String, require:true,
/role:String, require:true,/
}),
</pre>,
        'user/registration', type: POST, createAsyncThunk('REGISTER_USER');
    </li>
</ul>
<h3 align="center">Fail Page: <b> wrong route, bad request</b></h3>
<h3 align="center">ManagerPanel Page</h3>


<ul>
    <li>
        <h4>ManagerPanel,'manager/'</h4>
<ul>
    <li>
        <pre>getOrderStatuses()</pre>,
                 type: GET, with auth, createAsyncThunk('GET_ORDERS_STATUSES')
    </li>
</ul>
    </li>
    <li>
        <h4>ManagerListOrders,</h4>
<ul>
    <li>
        <pre>getOrders(status:String)</pre>,
                 'manager/list?status=', type: GET, with auth,
                createAsyncThunk('GET_ORDERS')
    </li>
</ul>
    </li>
    <li>
        <h4>ManagerOrderItem,</h4>
        <ul>
            <li>
<pre>getOrder(id:String)</pre>,
                'manager/order?id=' , type: GET, with auth, createAsyncThunk('GET_ORDER')
            </li>
            <li>
<pre>setNewStatus(status:String)</pre>,
                 '/manager/order/update-status' , type: POST, with auth,     createAsyncThunk('SET_NEW_STATUS')
            </li>
        </ul>
    </li>
</ul>

<h2 align="center">Shop Pages:</h3>
    <h3 align="center">Home Page<b>'/', request from SubHeader</b></h3>
    <ul>
        <li>Categories:</li>
        <li>CategoryCard</li>
    </ul>
    <h3 align="center">Goods Page
    </h3>
    <ul align="start">
        <li>'/cat/:id?page= &limit= ' , page of specific category;</li>
        <li>'/search?q= ' page of search;</li>
    </ul>
    <ul>
        <li>
<pre>getCategory('/cat/:id?page= &limit= '), </pre>createAsyncThunk('GET_CATEGORY');
        </li>
        <li>
<pre>searchingGoods('q= &page= &limit=' )</pre>, '/search?q= ', type: GET, createAsyncThunk('SEARCH_GOOD');
        </li>
    </ul>
    <h3 align="center">GoodItem Page<b>, '/good?id='</b></h3>
    <ul>
        <li>
<pre>
getGood(id:String)
</pre>, type: GET,createAsyncThunk('GET_GOOD')
        </li>
        <li>
            GoodItem
        </li>
    </ul>
    <h3 align="center">Order Page<b>, '/order'</b></h3>
    <ul>
        <li>--CartItem</li>
        <li>--OrderForm:</li>
        <ul>
            <li>---OrderContacts:</li>
        </ul>
    </ul>
    <ul>
        <li>
    <pre>
    isUserRegistered(email:String)
    </pre>
            ,'/user/isUser?email= ', type:GET,
        </li>
           <li>
            ---OrderDelivery:
            <ul>
                <li>----OptionOrderCard</li>
                <li>----DeliveryAdress:</li>
                <li>----DeliveryPost</li>
                <li>----DeliverySelf</li>
            </ul>
        </li>
        <li>
    <pre>
    finishOrder({
    user:{
    firstname: String, require: true,
    name: String, require: true,
    tel: String, require: true,
    email: String, require: true,
    },
    delivery:{
    delivery: String, require: true,
    city: String, require: true,
    street: String, require: true,
    house: String, require: true,
    litHouse: String, require: false,
    appartment: String, require: false,
    postNP: Number, require: true,
    office: String, require: false,
    },
    orderedGoods:[
    {
    _id: String, require: true,
    name: String, require: true,
    articul: Number, require: true,
    price: Number, require: true,
    picture: String, require: true,
    count: Number, require: true,
    },
    ],
    totalPrice: Number, require: true,
    })
    </pre>, 
        '/finish-order', type: POST, createAsyncThunk('FINISH_ORDER');
        </li>
    </ul>
    <h3 align="center">UserCabinet Page<b>'/order'</b></h3>
    <ul>
        <li>-userOrders: 'user/cabinet/orders'</li>
        <ul>
            <li>--UserOrderItem</li>
        </ul>
        <ul>-UserConfigs:'user/cabinet/configs',</ul>
    </ul>
    <ul>
        <li>
            <pre>isUserRegistered(email:String),'/user/isUser?email= ', type:GET;</pre>
        </li>
        <li>
<pre>
changeUserData({
name: String,
firstname: String,
tel: String,
email: String
})
</pre>,
             '/user/change-configs', type: POST
        </li>
    </ul>
    <h2 align="center">BACK-END: </h3>
        <h4>Server: Express;</h4>
        <h4>DB: MongoDB</h4>
        <h4>DB models '/server/models'</h4>
        <h4>
            Mongoose
        </h4>
        <h3 id="#beControllers" align="center">Controllers:</h3>
        <h3>-adminController: \ All routes require authentification (checkRole) \</h3>
        <ul>
            <li>
                <h3>-- createCategory: create new category in DB</h3>
                <b>route:</b> 'admin/create-category', type: POST
<pre>
req.body={
category: String, require: true;
description: String,require: true;
}
</pre>
<pre>
req.files={
picture: {file}, require: true;
}
</pre>
            </li>
            <li>
                <h3>-- createGood: create new good in DB</h3>
                <b>route:</b>'/create-good', type: POST
<pre>
req.body = {
name: String, require: true;
articul: Number, require: true;
price: Number, require: true;
category: String, require: true;
description: String, require: true;
}
</pre>
<pre>
req.files={
picture: {file}, require: true;
'image- ':{file},require: false;
}
</pre>
            </li>
            <li>
                <h4>-- updateGood: update good values in DB after changing</h4>
                <b>route:</b> '/update-good', type: POST
<pre>
req.body = {
id: String, require: true;
name: String, require: false;
articul: Number, require: false;
price: Number, require: false;
category: String, require: false;
description: String, require: false;
}
</pre>
<pre>
req.files={
picture: {file}, require: false;
'image- ':{file},require: false;
}
</pre>
            </li>
            <li>
                <h4>-- removeImage: delete image from good DB, and local disk memory</h4>
                <b>route: </b>'/remove-image', type: POST
<pre>
req.body = {
image: String, require: true
}
</pre>
            </li>
            <li>
                <h4>-- removeGood: delete good from good DB, delete connected pictures from DB and local disk memory
                </h4>
                <b>route:</b>'/remove-good', type: POST
<pre>
req.body = {
id: String, require: true
}
</pre>
            </li>
        </ul>
        <h3>-authController: \ All routes require authentification (checkRole) \</h3>
        <ul>
            <li>
                --userRegistration: register new user
                <b>route:</b>'user/registration', type: POST
<pre>
    req.body={
    email: String, require:true;
    password: String, require:true;
    role: String, require:false;
    }
</pre>
            </li>
            <li>
                --userLogin: login in application
                <b>route:</b>'user/login', type: POST
<pre>
    req.body ={
    email: String, require:true;
    password: String, require:true;
    }
</pre>      
            </li>
            <li>
                --userCheck: valid authentification
                <b>route:</b>'user/auth'
<pre>
    req.user={
    _id,String, require:true;
    email,String, require:true;
    role,[String, require:true;]
    }
</pre>
                , type: GET , auth: true
            </li>
        </ul>
        <h3>-contactsController: \ get contacts and info about market offices \</h3>
        <ul>
            <li>
                --getOfficeContact: get contacts and info about market's main office
                <b>route:</b>'/main-contacts',type: get
            </li>
            <li>
                --getSecondaryContacts: get contacts and info about market's secondary office
                <b>route:</b>'/secondary-contacts', type: get
            </li>
        </ul>
        <h3>-goodsController:</h3>
        <ul>
            <li>
                --getCategory: get categories list,
                <b>route:</b> '/' , type: GET
            </li>
            <li>
                --getGoods: get specific category
                <b>route:</b> '/cat/:id', type: GET
<pre>
    req.params={
    id: String, require: true,/name of category/;
    }
</pre>
<pre>
    req.query={
    s: String, require: false,/specific sort value(see 'helpers/sort');
    page: Number,require: false;
    limit: Number,require: false;
    }
</pre>
            </li>
            <li>
                --getGood: get specific good by id or articul
                <b>route:</b> '/good',
<pre>
    req.query ={
    id: String, require: true;
    }
    or:
    req.query ={
    articul: String, require: true;
    }
</pre>                              
            </li>
        <li>
            --searchGood: search goods
            <b>route:</b> '/search', type: GET
<pre>
    req.query={
    q: String, require: true;
    s: String, require: false,/specific sort value(see 'helpers/sort');
    page: Number,require: false;
    limit: Number,require: false;
    }
</pre>
        </li>
        <li>
            --searchGoodByArticul:
            <b>route:</b> '/search-articul', type: GET
<pre>
    req.query ={
    articul: String, require: true;
    }
</pre>
        </li>
    </ul>
        <h3>-orderController:</h3>
        <li>
            --isUserRegistered
            <b>route:</b> '/isUser',type: GET
<pre>req.query = { email }</pre>
        </li>
        <li>
            --createOrder:
            <b>route:</b> '/finish-order', type: POST , auth require: false
<pre>
    req.body ={
    user: Object, require: true (see user model in '/models');
    delivery: Object, require: true, (see orderDelivery model in '/models');
    orderedGoods: [Object, require: true]; (see good model in '/models'),
    totalPrice: Number, require: true;
    login: String, require: false;
    }
</pre>
        </li>
        <h3>-managerController: \ All routes require authentification (checkRole) \</h3>
        <ul>
                        <li>
                --getOrderStatuses: Getting types of order statuses from DB
                <b>route:</b> '/manager/', type: GET
            </li>
            <li>
                --getOrders:
                <b>route:</b> 'manager/list', type: GET
<pre>
    req.query={
    status: String, require: true;
    page: String, require: false;
    limit: String, require: false;
    }
</pre>
            </li>
            <li>
                --getOrder: get specific order
                <b>route:</b> 'manager/order', type: GET
<pre>
    req.query={
    id: String, require: true;
    }
</pre>
            </li>
            <li>
                --setNewStatus: changing status of order after processing order
                <b>route:</b> 'manager/order/update-status', type: POST
<pre>
    req.query = {
    orderId: String, require: true;
    status : String, require: true;
    }
</pre>
            </li>
        </ul>
       <h3> -userController:</h3>
       <li>
            --getUserOrders: get all user's orders
            req.user = {
            email: String
            }
            route: '/cabinet/orders',
            type: GET , with auth;
       </li>
        <li>
            --getUserInfo: get user's information
            <b>route:</b>/user/info , type: GET, with auth;
<pre>
    req.user={
    email:String
    }
</pre>
        </li>
        <li>
            --changeUserConfig: change user's info
            <b>route:</b> /user/change-configs , type: GET, with auth;
<pre>
    req.user={
    email:String
    }
</pre>
        </li>
        <h2 id="#beMiddleware" align="center">Middlewares:</h2 >
        <ul align="start">
            <li>-authMiddleware: check front-end's and back-end's tokens. if they match athotification is true.</li>
            <li>-checkRoleModel: check user for his role and give permit if values of tokens are match.</li>
            <li>-ErrorHandling: send response with specific error type if error is appear</li>
        </ul>
