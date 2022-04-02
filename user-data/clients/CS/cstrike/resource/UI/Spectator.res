"Resource/UI/SpectatorGUI.res"
{
	"SpectatorGUI"
	{
		"ControlName"	"Frame"
		"fieldName"		"SpectatorGUI"
		"tall"			"480"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"tabPosition"	"0"
	}
	"TopBar"
	{
		"ControlName"	"Panel"
		"fieldName"		"TopBar"
		"xpos"			"0"
		"ypos"			"0"
		"tall"			"52"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"0"
		"tabPosition"	"0"
	}
	"BottomBar"
	{
		"ControlName"	"Frame"
		"fieldName"		"BottomBar"
		"xpos"			"0"
		"ypos"			"429"
		"tall"			"52"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"0"
		"tabPosition"	"0"
	}
	"bottombarblank"
	{
		"ControlName"	"Panel"
		"fieldName"		"bottombarblank"
		"xpos"			"0"
		"ypos"			"429"
		"tall"			"52"		// this needs to match the size of BottomBar
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"tabPosition"	"0"
	}
	"playerlabel"
	{
		"ControlName"	"Label"
		"fieldName"		"playerlabel"
		"xpos"			"c-108"
		"ypos"			"441"
		"wide"			"216"
		"tall"			"26"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"0"
		"enabled"		"1"
		"tabPosition"	"0"
		"textAlignment"	"center"
	}
	"CTScoreLabel"
	{
		"ControlName"	"Label"
		"fieldName"		"CTScoreLabel"
		"xpos"			"r233"
		//"xpos"			"r268"
		"ypos"			"12"
		"wide"			"150"
		"tall"			"15"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		"#Cstrike_Spec_CT_Score"
		"textAlignment"	"east"
		"dulltext"		"0"
		"brighttext"	"0"
	}
	"CTScoreValue"
	{
		"ControlName"	"Label"
		"fieldName"		"CTScoreValue"
		"xpos"			"r80"
		//"xpos"			"r112"
		"ypos"			"12"
		"wide"			"10"
		//"wide"			"15"
		"tall"			"15"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		""
		"textAlignment"	"west"
		"dulltext"		"0"
		"brighttext"	"0"
	}
	"TERScoreLabel"
	{
		"ControlName"	"Label"
		"fieldName"		"TERScoreLabel"
		"xpos"			"r233"
		//"xpos"			"r268"
		"ypos"			"24"
		"wide"			"150"
		"tall"			"15"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		"#Cstrike_Spec_Ter_Score"
		"textAlignment"	"east"
		"dulltext"		"0"
		"brighttext"	"0"
	}
	"TERScoreValue"
	{
		"ControlName"	"Label"
		"fieldName"		"TERScoreValue"
		"xpos"			"r80"
		//"xpos"			"r112"
		"ypos"			"24"
		"wide"			"10"
		//"wide"			"15"
		"tall"			"15"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		""
		"textAlignment"	"west"
		"dulltext"		"0"
		"brighttext"	"0"
	}
	"DividerBar"
	{
		"ControlName"	"ImagePanel"
		"fieldName"		"DividerBar"
		"xpos"			"r64"
		"ypos"			"12"
		"wide"			"1"
		"tall"			"30"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"tabPosition"	"0"
		"fillcolor"		"BorderBright"
		"labelText"		""
		"textAlignment"	"center"
	}
	"timerimage"
	{
		"ControlName"	"ImagePanel"
		"fieldName"		"timerimage"
		"xpos"			"r56"
		"ypos"			"26"
		"wide"			"12"
		"tall"			"12"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		""
		"textAlignment"	"center"
		"dulltext"		"0"
		"brighttext"	"0"
		"image"			"gfx/vgui/timer"
		"scaleImage"	"1"
	}
	"timerlabel"
	{
		"ControlName"	"Label"
		"fieldName"		"timerlabel"
		"xpos"			"r42"
		"ypos"			"24"
		"wide"			"40"
		"tall"			"15"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		"00:00"
		"textAlignment"	"west"
		"dulltext"		"0"
		"brighttext"	"0"
	}
	"extrainfo"
	{
		"ControlName"	"Label"
		"fieldName"		"extrainfo"
		"xpos"			"r56"
		"ypos"			"12"
		"wide"			"44"
		"tall"			"15"
		"autoResize"	"0"
		"pinCorner"		"0"
		"visible"		"1"
		"enabled"		"1"
		"labelText"		""
		"textAlignment"	"west"
		"dulltext"		"0"
		"brighttext"	"0"
	}
}