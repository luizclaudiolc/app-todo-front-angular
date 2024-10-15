'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">app-todo-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppHeaderModule.html" data-type="entity-link" >AppHeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppHeaderModule-bd154bfb4792579d50584194fa8711f140540f80a51adda9019c2c43c7eedfc194347f9e9bd6040ed30b0cdd91dda742deab67c00032620ce0b5e82838219418"' : 'data-bs-target="#xs-components-links-module-AppHeaderModule-bd154bfb4792579d50584194fa8711f140540f80a51adda9019c2c43c7eedfc194347f9e9bd6040ed30b0cdd91dda742deab67c00032620ce0b5e82838219418"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppHeaderModule-bd154bfb4792579d50584194fa8711f140540f80a51adda9019c2c43c7eedfc194347f9e9bd6040ed30b0cdd91dda742deab67c00032620ce0b5e82838219418"' :
                                            'id="xs-components-links-module-AppHeaderModule-bd154bfb4792579d50584194fa8711f140540f80a51adda9019c2c43c7eedfc194347f9e9bd6040ed30b0cdd91dda742deab67c00032620ce0b5e82838219418"' }>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' : 'data-bs-target="#xs-components-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' :
                                            'id="xs-components-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' :
                                        'id="xs-injectables-links-module-AppModule-b99c0f303fe41bc0a2a6ba5f69092f0daea834f2b25df10708fb3a92319328affee0089da90003b502dfeea1f85176baa7a4823f61c6b266e95a778771f48670"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CreateModule.html" data-type="entity-link" >CreateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CreateModule-d288ab7ebc1ca254304b86de71c6c112103c07367da704562c03827a277b5b7e6dbdfeaee92467e44937bbebb6c3a898212d167b6bc2747762ec831d549ab9f5"' : 'data-bs-target="#xs-components-links-module-CreateModule-d288ab7ebc1ca254304b86de71c6c112103c07367da704562c03827a277b5b7e6dbdfeaee92467e44937bbebb6c3a898212d167b6bc2747762ec831d549ab9f5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreateModule-d288ab7ebc1ca254304b86de71c6c112103c07367da704562c03827a277b5b7e6dbdfeaee92467e44937bbebb6c3a898212d167b6bc2747762ec831d549ab9f5"' :
                                            'id="xs-components-links-module-CreateModule-d288ab7ebc1ca254304b86de71c6c112103c07367da704562c03827a277b5b7e6dbdfeaee92467e44937bbebb6c3a898212d167b6bc2747762ec831d549ab9f5"' }>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreateTasksModule.html" data-type="entity-link" >CreateTasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CreateTasksModule-6b6f031caaf32542fc87531e976302781b20403c6589f368386c41fb60518c42155af71ef27310274e8d65695a294d3971dd613a06f94c4a70da6c42f6f75fa9"' : 'data-bs-target="#xs-components-links-module-CreateTasksModule-6b6f031caaf32542fc87531e976302781b20403c6589f368386c41fb60518c42155af71ef27310274e8d65695a294d3971dd613a06f94c4a70da6c42f6f75fa9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreateTasksModule-6b6f031caaf32542fc87531e976302781b20403c6589f368386c41fb60518c42155af71ef27310274e8d65695a294d3971dd613a06f94c4a70da6c42f6f75fa9"' :
                                            'id="xs-components-links-module-CreateTasksModule-6b6f031caaf32542fc87531e976302781b20403c6589f368386c41fb60518c42155af71ef27310274e8d65695a294d3971dd613a06f94c4a70da6c42f6f75fa9"' }>
                                            <li class="link">
                                                <a href="components/CreateTasksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateTasksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-b0915e0444d5a97b8b13d0de27823be4ea9c79a85711164cea28ed4b9696fb2e821691336b6b5e61c0620f67268527a4e064c7bd2d7d199b9bf366f9c595384c"' : 'data-bs-target="#xs-components-links-module-DashboardModule-b0915e0444d5a97b8b13d0de27823be4ea9c79a85711164cea28ed4b9696fb2e821691336b6b5e61c0620f67268527a4e064c7bd2d7d199b9bf366f9c595384c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-b0915e0444d5a97b8b13d0de27823be4ea9c79a85711164cea28ed4b9696fb2e821691336b6b5e61c0620f67268527a4e064c7bd2d7d199b9bf366f9c595384c"' :
                                            'id="xs-components-links-module-DashboardModule-b0915e0444d5a97b8b13d0de27823be4ea9c79a85711164cea28ed4b9696fb2e821691336b6b5e61c0620f67268527a4e064c7bd2d7d199b9bf366f9c595384c"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-e1352ccece571c71d2bd73179415cc9e1672e0cab506295beb97460a5461a0e5c8d9026fe206fbddf712df2085eda4ab622e3ae527cb8ef060ced39a389591e6"' : 'data-bs-target="#xs-components-links-module-HomeModule-e1352ccece571c71d2bd73179415cc9e1672e0cab506295beb97460a5461a0e5c8d9026fe206fbddf712df2085eda4ab622e3ae527cb8ef060ced39a389591e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-e1352ccece571c71d2bd73179415cc9e1672e0cab506295beb97460a5461a0e5c8d9026fe206fbddf712df2085eda4ab622e3ae527cb8ef060ced39a389591e6"' :
                                            'id="xs-components-links-module-HomeModule-e1352ccece571c71d2bd73179415cc9e1672e0cab506295beb97460a5461a0e5c8d9026fe206fbddf712df2085eda4ab622e3ae527cb8ef060ced39a389591e6"' }>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-8ef4fb6893b1b1c052969df020587dbc8b70d8e6a3321c67ac60648b392a3d88a34aaf313430699cb54e0b0e62f35518e22c3231f55c8ebee9915f792d8196d4"' : 'data-bs-target="#xs-components-links-module-LoginModule-8ef4fb6893b1b1c052969df020587dbc8b70d8e6a3321c67ac60648b392a3d88a34aaf313430699cb54e0b0e62f35518e22c3231f55c8ebee9915f792d8196d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-8ef4fb6893b1b1c052969df020587dbc8b70d8e6a3321c67ac60648b392a3d88a34aaf313430699cb54e0b0e62f35518e22c3231f55c8ebee9915f792d8196d4"' :
                                            'id="xs-components-links-module-LoginModule-8ef4fb6893b1b1c052969df020587dbc8b70d8e6a3321c67ac60648b392a3d88a34aaf313430699cb54e0b0e62f35518e22c3231f55c8ebee9915f792d8196d4"' }>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PieChartModule.html" data-type="entity-link" >PieChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PieChartModule-6e49398abf4d54d050659b11a9b657a267d74e15b061a960e6906f90fb7466ff7479fe905b4c3bab9a8361a7ce52878d270da9a1a2a00f778433f2dbaec42a44"' : 'data-bs-target="#xs-components-links-module-PieChartModule-6e49398abf4d54d050659b11a9b657a267d74e15b061a960e6906f90fb7466ff7479fe905b4c3bab9a8361a7ce52878d270da9a1a2a00f778433f2dbaec42a44"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PieChartModule-6e49398abf4d54d050659b11a9b657a267d74e15b061a960e6906f90fb7466ff7479fe905b4c3bab9a8361a7ce52878d270da9a1a2a00f778433f2dbaec42a44"' :
                                            'id="xs-components-links-module-PieChartModule-6e49398abf4d54d050659b11a9b657a267d74e15b061a960e6906f90fb7466ff7479fe905b4c3bab9a8361a7ce52878d270da9a1a2a00f778433f2dbaec42a44"' }>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableTasksModule.html" data-type="entity-link" >TableTasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableTasksModule-9a108233f12283664370aabafad04c9fbe961918c8b37286d99215454f2f54688430ce07092508ac73b327d94fcc5445779f1eaede2b0f3db666ae60c21c5bde"' : 'data-bs-target="#xs-components-links-module-TableTasksModule-9a108233f12283664370aabafad04c9fbe961918c8b37286d99215454f2f54688430ce07092508ac73b327d94fcc5445779f1eaede2b0f3db666ae60c21c5bde"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableTasksModule-9a108233f12283664370aabafad04c9fbe961918c8b37286d99215454f2f54688430ce07092508ac73b327d94fcc5445779f1eaede2b0f3db666ae60c21c5bde"' :
                                            'id="xs-components-links-module-TableTasksModule-9a108233f12283664370aabafad04c9fbe961918c8b37286d99215454f2f54688430ce07092508ac73b327d94fcc5445779f1eaede2b0f3db666ae60c21c5bde"' }>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppHeaderComponent.html" data-type="entity-link" >AppHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PieChartComponent.html" data-type="entity-link" >PieChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableTasksComponent.html" data-type="entity-link" >TableTasksComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link" >TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoggedUserGuard.html" data-type="entity-link" >LoggedUserGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LogoutUserGuard.html" data-type="entity-link" >LogoutUserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link" >AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPieData.html" data-type="entity-link" >IPieData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITask.html" data-type="entity-link" >ITask</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemsMenu.html" data-type="entity-link" >ItemsMenu</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});